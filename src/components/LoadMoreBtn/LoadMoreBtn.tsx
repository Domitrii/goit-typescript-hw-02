import { FC } from 'react';
import css from './LoadMoreButton.module.css';

interface LoadMoreBtnProps {
  onClick: () => void,
  isLoading: boolean
}

const LoadMoreBtn:FC<LoadMoreBtnProps> = ({onClick, isLoading}) => {
  return (
    <div className={css.container}>
    <button className={css.button} type="button" onClick={onClick} disabled={isLoading}>
        LoadMoreBtn
    </button>
    </div>
  )
}

export default LoadMoreBtn