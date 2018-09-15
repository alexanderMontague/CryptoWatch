import React from 'react';
import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

const Portfolio = props => {
  return (
    <div>
      <Header title="Portfolio" />
      <PortfolioHeader />
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
    </div>
  );
};

export default Portfolio;
