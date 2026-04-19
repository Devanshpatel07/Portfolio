import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useState } from 'react'
import { cropNFT, kyc, lendingPool, loanVault } from '@/services/solana'
import type { CropData, KYCData, CropNFT, Loan, LendingPool } from '@/services/solana'

export function useAgriFi() {
  const { publicKey, connected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const walletAddress = publicKey?.toBase58() ?? ''

  // ── KYC ──────────────────────────────────────────────────
  const submitKYC = useCallback(async (data: Omit<KYCData, 'farmerWallet' | 'submittedAt' | 'status'>) => {
    if (!walletAddress) throw new Error('Wallet not connected')
    setLoading(true)
    setError(null)
    try {
      return await kyc.submitKYC({ ...data, farmerWallet: walletAddress })
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  // ── MINT NFT ─────────────────────────────────────────────
  const mintCropNFT = useCallback(async (cropData: Omit<CropData, 'farmerWallet'>) => {
    if (!walletAddress) throw new Error('Wallet not connected')
    setLoading(true)
    setError(null)
    try {
      return await cropNFT.mintCropNFT(walletAddress, { ...cropData, farmerWallet: walletAddress })
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  // ── FETCH MY NFTS ────────────────────────────────────────
  const getMyNFTs = useCallback(async (): Promise<CropNFT[]> => {
    if (!walletAddress) return []
    return cropNFT.getFarmerNFTs(walletAddress)
  }, [walletAddress])

  // ── ESTIMATE LOAN ────────────────────────────────────────
  const estimateLoan = useCallback(async (cropData: CropData) => {
    return cropNFT.estimateLoan(cropData)
  }, [])

  // ── REQUEST LOAN ─────────────────────────────────────────
  const requestLoan = useCallback(async (nftMint: string, poolId: string, amount: number) => {
    if (!walletAddress) throw new Error('Wallet not connected')
    setLoading(true)
    setError(null)
    try {
      return await loanVault.requestLoan(walletAddress, nftMint, poolId, amount)
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  // ── MY LOANS ─────────────────────────────────────────────
  const getMyLoans = useCallback(async (): Promise<Loan[]> => {
    if (!walletAddress) return []
    return loanVault.getFarmerLoans(walletAddress)
  }, [walletAddress])

  // ── LENDING POOLS ────────────────────────────────────────
  const getPools = useCallback(async (): Promise<LendingPool[]> => {
    return lendingPool.getPools()
  }, [])

  return {
    walletAddress,
    connected,
    loading,
    error,
    submitKYC,
    mintCropNFT,
    getMyNFTs,
    estimateLoan,
    requestLoan,
    getMyLoans,
    getPools,
  }
}
