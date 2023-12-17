'use client';

import React from 'react';
import MiddleBlock from '../components/statisticsComponents/MiddleBlock/MiddleBlock';
import TopBlock from '../components/statisticsComponents/TopBlock/TopBlock';
import BottomBlock from '../components/statisticsComponents/BottomBlock/BottomBlock';

const Statistics = () => {
  return (
    <main>
      <div className='container mx-auto my-0 pt-12 pb-20'>
        <TopBlock />
        <MiddleBlock />
        <BottomBlock />
      </div>
    </main>
  );
};

export default Statistics;
