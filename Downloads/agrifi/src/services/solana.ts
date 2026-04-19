/**
 * AgriFi — Mock Solana Service Layer
 * ────────────────────────────────────
 * Phase 1: All on-chain calls are mocked.
 * Phase 4: Replace MOCK_MODE=false + connect real Anchor IDLs.
 *
 * Usage:
 *   import { cropNFT, lendingPool, loanVault } from '@/services/solana'
 */

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

/* ─── CONFIG ────────────────────────────────────────────── */
export const NETWORK = (import.meta.env.VITE_SOLANA_NETWORK as 'devnet' | 'mainnet-beta') ?? 'devnet'
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_URL ?? clusterApiUrl(NETWORK)
export const MOCK_MODE = import.meta.env.VITE_USE_MOCK !== 'false'

export const connection = new Connection(RPC_ENDPOINT, 'confirmed')

/* ─── PROGRAM IDs (deploy these in Phase 4) ────────────── */
export const PROGRAM_IDS = {
  CROP_NFT:      'CrpNFT1111111111111111111111111111111111111',
  LENDING_POOL:  'LndP001111111111111111111111111111111111111',
  LOAN_VAULT:    'VLT0001111111111111111111111111111111111111',
  ORACLE_ADAPTER:'ORC0001111111111111111111111111111111111111',
  INSURANCE:     'INS0001111111111111111111111111111111111111',
  LIQUIDATION:   'LIQ0001111111111111111111111111111111111111',
}

/* USDC mint (devnet test token / mainnet real USDC) */
export const USDC_MINT = NETWORK === 'mainnet-beta'
  ? new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  : new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU') // devnet USDC

/* ─── TYPES ─────────────────────────────────────────────── */
export interface CropData {
  farmerWallet:  string
  cropType:      string
  acreage:       number
  sowingDate:    string   // ISO date
  harvestDate:   string   // ISO date
  state:         string
  district:      string
  khasra:        string
  predictedYield?: number // tonnes
  ndviScore?:    number   // 0–1 from satellite
  irrigationType: string
}

export interface CropNFT {
  mint:       string
  farmerWallet: string
  cropData:   CropData
  mintedAt:   number     // Unix timestamp
  metadataUri: string
  loanStatus: 'none' | 'pending' | 'active' | 'repaid' | 'liquidated'
}

export interface LendingPool {
  id:             string
  cropType:       string
  region:         string
  totalDeposited: number  // USDC, 6 decimals
  totalBorrowed:  number
  apy:            number  // e.g. 0.124 = 12.4%
  minLoan:        number
  maxLoan:        number
  ltvRatio:       number  // e.g. 0.60
  active:         boolean
}

export interface Loan {
  id:             string
  loanerWallet:   string
  farmerWallet:   string
  nftMint:        string
  principal:      number  // USDC
  interestRate:   number  // APR, e.g. 0.098
  startDate:      string
  dueDate:        string
  repaid:         number
  status:         'pending' | 'active' | 'overdue' | 'repaid' | 'liquidated'
  healthFactor:   number  // > 1 = safe
}

export interface TxResult {
  success: boolean
  txSig:   string
  error?:  string
}

/* ─── MOCK HELPERS ──────────────────────────────────────── */
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

function mockAddr(prefix = ''): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  const rand = Array.from({ length: 44 - prefix.length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return prefix + rand
}

function mockTxSig(): string {
  return mockAddr()
}

/* ─── MOCK STORE (in-memory, simulates on-chain state) ─── */
class MockStore {
  private nfts:  Map<string, CropNFT>    = new Map()
  private pools: Map<string, LendingPool> = new Map()
  private loans: Map<string, Loan>       = new Map()

  constructor() {
    this.seedPools()
  }

  private seedPools() {
    const crops = ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Maize']
    const regions = ['Punjab-Haryana', 'UP-Bihar', 'Maharashtra', 'Karnataka']
    crops.forEach((crop, i) => {
      const id = mockAddr('pool-')
      this.pools.set(id, {
        id,
        cropType:       crop,
        region:         regions[i % regions.length],
        totalDeposited: Math.floor(Math.random() * 500000 + 50000),
        totalBorrowed:  Math.floor(Math.random() * 300000 + 10000),
        apy:            parseFloat((Math.random() * 0.08 + 0.09).toFixed(3)),
        minLoan:        500,
        maxLoan:        50000,
        ltvRatio:       0.60,
        active:         true,
      })
    })
  }

  setNFT(mint: string, nft: CropNFT) { this.nfts.set(mint, nft) }
  getNFT(mint: string) { return this.nfts.get(mint) }
  getAllNFTs(wallet: string) {
    return Array.from(this.nfts.values()).filter(n => n.farmerWallet === wallet)
  }

  getPools() { return Array.from(this.pools.values()) }
  getPool(id: string) { return this.pools.get(id) }

  setLoan(id: string, loan: Loan) { this.loans.set(id, loan) }
  getLoan(id: string) { return this.loans.get(id) }
  getLoans(wallet: string) {
    return Array.from(this.loans.values()).filter(l =>
      l.farmerWallet === wallet || l.loanerWallet === wallet
    )
  }
}

const mockStore = new MockStore()

/* ─── CROP PRICE ORACLE (mocked) ────────────────────────── */
const CROP_PRICES_USD: Record<string, number> = {
  Wheat:     220,  // USD/tonne (MSP-based)
  Rice:      280,
  Maize:     190,
  Cotton:    620,
  Soybean:   380,
  Sugarcane:  45,
  Mustard:   510,
  Potato:    160,
  Onion:     200,
  Tomato:    140,
  Chickpea:  470,
  Other:     250,
}

const YIELD_PER_ACRE: Record<string, number> = {
  Wheat: 1.8, Rice: 1.6, Maize: 2.2, Cotton: 0.5, Soybean: 0.8,
  Sugarcane: 25, Mustard: 0.7, Potato: 6.0, Onion: 5.0,
  Tomato: 8.0, Chickpea: 0.6, Other: 1.5,
}

/* ─── SERVICE: CROP NFT ─────────────────────────────────── */
const mockCropNFT = {
  async mintCropNFT(walletAddress: string, cropData: CropData): Promise<{ mint: string; txSig: string; nft: CropNFT }> {
    await sleep(1800)

    const predictedYield = (YIELD_PER_ACRE[cropData.cropType] ?? 1.5) * cropData.acreage
    const ndviScore = 0.55 + Math.random() * 0.35

    const mint = mockAddr('CRP')
    const nft: CropNFT = {
      mint,
      farmerWallet: walletAddress,
      cropData: { ...cropData, predictedYield, ndviScore },
      mintedAt: Date.now(),
      metadataUri: `https://arweave.net/${mockAddr('ar-')}`,
      loanStatus: 'none',
    }

    mockStore.setNFT(mint, nft)
    console.log('[Mock] Crop NFT minted:', mint)
    return { mint, txSig: mockTxSig(), nft }
  },

  async getCropNFT(mint: string): Promise<CropNFT | null> {
    await sleep(200)
    return mockStore.getNFT(mint) ?? null
  },

  async getFarmerNFTs(walletAddress: string): Promise<CropNFT[]> {
    await sleep(400)
    return mockStore.getAllNFTs(walletAddress)
  },

  async estimateLoan(cropData: CropData): Promise<{ maxLoan: number; cropValue: number; predictedYield: number }> {
    const predictedYield = (YIELD_PER_ACRE[cropData.cropType] ?? 1.5) * cropData.acreage
    const cropPrice      = CROP_PRICES_USD[cropData.cropType] ?? 250
    const cropValue      = predictedYield * cropPrice
    const maxLoan        = cropValue * 0.60
    return { maxLoan, cropValue, predictedYield }
  },
}

/* ─── SERVICE: LENDING POOL ─────────────────────────────── */
const mockLendingPool = {
  async getPools(): Promise<LendingPool[]> {
    await sleep(300)
    return mockStore.getPools()
  },

  async depositUsdc(walletAddress: string, poolId: string, amount: number): Promise<TxResult> {
    await sleep(1500)
    const pool = mockStore.getPool(poolId)
    if (!pool) return { success: false, txSig: '', error: 'Pool not found' }
    pool.totalDeposited += amount
    console.log('[Mock] USDC deposited:', amount, 'into pool', poolId)
    return { success: true, txSig: mockTxSig() }
  },

  async withdrawUsdc(walletAddress: string, poolId: string, amount: number): Promise<TxResult> {
    await sleep(1500)
    return { success: true, txSig: mockTxSig() }
  },

  async getPoolApy(poolId: string): Promise<number> {
    await sleep(100)
    return mockStore.getPool(poolId)?.apy ?? 0.10
  },
}

/* ─── SERVICE: LOAN VAULT ───────────────────────────────── */
const mockLoanVault = {
  async requestLoan(
    farmerWallet: string,
    nftMint:      string,
    poolId:       string,
    amount:       number
  ): Promise<{ loanId: string; txSig: string } | { error: string }> {
    await sleep(2000)

    const nft = mockStore.getNFT(nftMint)
    if (!nft) return { error: 'NFT not found in registry' }
    if (nft.farmerWallet !== farmerWallet) return { error: 'NFT does not belong to this wallet' }
    if (nft.loanStatus !== 'none') return { error: 'NFT already used as collateral' }

    const est = await mockCropNFT.estimateLoan(nft.cropData)
    if (amount > est.maxLoan) return { error: `Requested amount exceeds 60% LTV. Max: $${est.maxLoan.toFixed(0)}` }

    const loanId = mockAddr('LOAN')
    const dueDate = new Date(nft.cropData.harvestDate)
    dueDate.setDate(dueDate.getDate() + 30) // 30 day grace after harvest

    const loan: Loan = {
      id:           loanId,
      loanerWallet: poolId,
      farmerWallet,
      nftMint,
      principal:    amount,
      interestRate: 0.098,
      startDate:    new Date().toISOString(),
      dueDate:      dueDate.toISOString(),
      repaid:       0,
      status:       'pending',
      healthFactor: est.cropValue / amount,
    }

    mockStore.setLoan(loanId, loan)
    nft.loanStatus = 'pending'
    mockStore.setNFT(nftMint, nft)

    console.log('[Mock] Loan requested:', loanId, 'amount:', amount)
    return { loanId, txSig: mockTxSig() }
  },

  async repayLoan(farmerWallet: string, loanId: string, amount: number): Promise<TxResult> {
    await sleep(1500)
    const loan = mockStore.getLoan(loanId)
    if (!loan) return { success: false, txSig: '', error: 'Loan not found' }
    loan.repaid += amount
    if (loan.repaid >= loan.principal) {
      loan.status = 'repaid'
      const nft = mockStore.getNFT(loan.nftMint)
      if (nft) { nft.loanStatus = 'repaid'; mockStore.setNFT(loan.nftMint, nft) }
    }
    return { success: true, txSig: mockTxSig() }
  },

  async getFarmerLoans(farmerWallet: string): Promise<Loan[]> {
    await sleep(300)
    return mockStore.getLoans(farmerWallet)
  },

  async getLoanHealth(loanId: string): Promise<number> {
    await sleep(100)
    return mockStore.getLoan(loanId)?.healthFactor ?? 1.5
  },
}

/* ─── SERVICE: ORACLE ───────────────────────────────────── */
const mockOracle = {
  async getCropPrice(cropType: string): Promise<{ price: number; confidence: number; lastUpdated: number }> {
    await sleep(200)
    const price = CROP_PRICES_USD[cropType] ?? 250
    const variance = (Math.random() - 0.5) * 0.04  // ±2%
    return {
      price:       price * (1 + variance),
      confidence:  0.95 + Math.random() * 0.04,
      lastUpdated: Date.now() - Math.floor(Math.random() * 300000),
    }
  },

  async getNDVI(lat: number, lng: number): Promise<{ score: number; quality: string; date: string }> {
    await sleep(500)
    const score = 0.55 + Math.random() * 0.35
    return {
      score,
      quality: score > 0.75 ? 'Excellent' : score > 0.60 ? 'Good' : score > 0.45 ? 'Fair' : 'Poor',
      date:    new Date().toISOString().split('T')[0],
    }
  },

  async getWeatherRisk(lat: number, lng: number): Promise<{ riskScore: number; factors: string[] }> {
    await sleep(400)
    return {
      riskScore: Math.random() * 0.4,
      factors:   ['Normal monsoon forecast', 'Low drought risk', 'Temperature within range'],
    }
  },
}

/* ─── SERVICE: KYC (Lovable Cloud) ─────────────────────── */
export interface KYCData {
  farmerWallet:  string
  fullName:      string
  phone:         string
  email?:        string
  aadhaarLast4:  string
  docType:       string
  docNumber?:    string
  state:         string
  district:      string
  khasra:        string
  landArea:      number
  gpsLat?:       number
  gpsLng?:       number
  submittedAt:   number
  status:        'pending' | 'approved' | 'rejected'
  reviewNotes?:  string
}

const mockKYC = {
  async submitKYC(data: Omit<KYCData, 'submittedAt' | 'status'>): Promise<{ kycId: string }> {
    await sleep(1000)
    const kycId = 'KYC-' + Date.now()
    const kyc: KYCData = { ...data, submittedAt: Date.now(), status: 'pending' }
    /* In production: POST to Lovable Cloud API */
    console.log('[Mock KYC] Submitted:', kycId, kyc)
    /* Simulate SMS notification */
    console.log(`[Mock SMS] Sent to ${data.phone}: Your KYC is under review. ID: ${kycId}`)
    return { kycId }
  },

  async getKYCStatus(kycId: string): Promise<KYCData['status']> {
    await sleep(200)
    return 'pending'
  },

  /* Admin: list pending KYCs */
  async getPendingKYCs(): Promise<KYCData[]> {
    await sleep(400)
    return []
  },

  async approveKYC(kycId: string, notes?: string): Promise<void> {
    await sleep(500)
    console.log('[Mock Admin] KYC approved:', kycId, notes)
  },

  async rejectKYC(kycId: string, notes: string): Promise<void> {
    await sleep(500)
    console.log('[Mock Admin] KYC rejected:', kycId, notes)
  },
}

/* ─── REAL SERVICES (Phase 4 — uncomment when Anchor deployed) ── */
/*
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import type { CropNftIdl }  from './idl/crop_nft'
import type { LoanVaultIdl } from './idl/loan_vault'

const realCropNFT = {
  async mintCropNFT(wallet, cropData) {
    const provider = new AnchorProvider(connection, wallet, {})
    const program  = new Program<CropNftIdl>(CROP_NFT_IDL, PROGRAM_IDS.CROP_NFT, provider)
    const [cropPDA] = PublicKey.findProgramAddressSync([Buffer.from('crop'), wallet.publicKey.toBuffer()], program.programId)
    const tx = await program.methods
      .mintCrop({ cropType: cropData.cropType, acreage: cropData.acreage * 100, ... })
      .accounts({ farmer: wallet.publicKey, cropAccount: cropPDA, ... })
      .rpc()
    return { mint: cropPDA.toString(), txSig: tx }
  }
}
*/

/* ─── EXPORTS ────────────────────────────────────────────── */
export const cropNFT     = MOCK_MODE ? mockCropNFT    : mockCropNFT    /* swap for real */
export const lendingPool = MOCK_MODE ? mockLendingPool : mockLendingPool
export const loanVault   = MOCK_MODE ? mockLoanVault   : mockLoanVault
export const oracle      = MOCK_MODE ? mockOracle      : mockOracle
export const kyc         = MOCK_MODE ? mockKYC         : mockKYC

/* ─── CONVENIENCE: Full onboarding flow ─────────────────── */
export async function completeFarmerOnboarding(params: {
  walletAddress: string
  kycData:       Omit<KYCData, 'submittedAt' | 'status'>
  cropData:      CropData
}): Promise<{
  kycId:   string
  mint:    string
  txSig:   string
  nft:     CropNFT
  maxLoan: number
}> {
  /* 1. Submit KYC to Lovable Cloud */
  const { kycId } = await kyc.submitKYC(params.kycData)

  /* 2. Get AI yield estimate */
  const { maxLoan, predictedYield } = await cropNFT.estimateLoan(params.cropData)

  /* 3. Mint Crop NFT on Solana */
  const { mint, txSig, nft } = await cropNFT.mintCropNFT(
    params.walletAddress,
    { ...params.cropData, predictedYield }
  )

  return { kycId, mint, txSig, nft, maxLoan }
}
