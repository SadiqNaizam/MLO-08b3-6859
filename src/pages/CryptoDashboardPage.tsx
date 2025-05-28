import React from 'react';
import CryptoDashboardLayout from '../components/layout/CryptoDashboardLayout';
import BreadcrumbNav from '../components/CryptoDashboard/BreadcrumbNav';
import PortfolioHeader from '../components/CryptoDashboard/PortfolioHeader';
import PortfolioDonutChart from '../components/CryptoDashboard/PortfolioDonutChart';
import CryptoAssetsList from '../components/CryptoDashboard/CryptoAssetsList';
import StatCardsRow from '../components/CryptoDashboard/StatCardsRow';
import MarketGraph from '../components/CryptoDashboard/MarketGraph';
import CryptoSummaryCards from '../components/CryptoDashboard/CryptoSummaryCards';

const CryptoDashboardPage: React.FC = () => {
  return (
    <CryptoDashboardLayout title="Crypto Portfolio Overview">
      {/* Breadcrumb navigation */}
      <BreadcrumbNav />

      {/* Portfolio header section */}
      <PortfolioHeader />

      {/* Main portfolio section: Donut chart and Assets list */}
      <div className="flex flex-col md:flex-row gap-6">
        <PortfolioDonutChart /> {/* Takes md:w-1/3 by default from its own class */}
        <CryptoAssetsList />    {/* Takes md:w-2/3 by default from its own class */}
      </div>

      {/* Statistics cards row */}
      <StatCardsRow />

      {/* Market graph section */}
      <MarketGraph />

      {/* Individual crypto summary cards */}
      <CryptoSummaryCards />
      
    </CryptoDashboardLayout>
  );
};

export default CryptoDashboardPage;
