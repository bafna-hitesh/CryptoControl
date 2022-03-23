/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import Loader from '../Loader';

import './Skeleton.css';

function Skeleton({ type }) {
    function CardSkeleton() {
    return (
      <div className="middleSk-card">
        <div className="middleSk-card-header">
          <span className="postSk header-name" />
          <span className="postSk avatar" />
        </div>
        <div className="postSk breakline" />
        <div className="middleSk-card-contain">
          <div className="postSk contain" />
          <div className="postSk contain" />
          <div className="postSk contain" />
        </div>
      </div>
    );
  }
  const HomeSkeleton = () => (
    <main>
      <div className="postSk postSk-header" />

      <div className="postSk-info">
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
        <div className="postSk-info-body">
          <div className="postSk postSk-info-header" />
          <div className="postSk postSk-info-content" />
        </div>
      </div>
      {/* middle section */}
      <div className="middle-header">
        <div className="postSk middleSk-header" />
        <div className="postSk middleSk-header-content" />
      </div>
      <div className="middle-content">
        <div className="middleSk-card">
          <div className="middleSk-card-header">
            <span className="postSk header-name" />
            <span className="postSk avatar" />
          </div>
          <div className="postSk breakline" />
          <div className="middleSk-card-contain">
            <div className="postSk contain" />
            <div className="postSk contain" />
            <div className="postSk contain" />
          </div>
        </div>
        <div className="middle-content">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <CardSkeleton key={n} />)}
        </div>
      </div>
    </main>

  );
  const CryptoSkeleton = () => (
    <>
      <div className="postSk searchSkl" />
      <div className="middle-content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => <CardSkeleton key={n} />)}
      </div>
    </>
  );
  const ExhangeSkeleton = () => (
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((n) => <div className="postSk exchangeSkl" />)
  );
  const NewsSkeleton = () => (
    <>
      <div className="postSk searchSkl" />
      <div className="middle-content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => <CardSkeleton key={n} />)}
      </div>
    </>
  );
  return (
  type === 'homepageScrren' ? <HomeSkeleton />
  : type === 'cryptocurrencies' ? <CryptoSkeleton />
  : type === 'exchanges' ? <ExhangeSkeleton />
  : type === 'news' ? <NewsSkeleton />
  : <Loader />
  );
}

export default Skeleton;
