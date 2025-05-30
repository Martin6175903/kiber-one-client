import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { rootActions } from '@/src/store/root-actions'

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}