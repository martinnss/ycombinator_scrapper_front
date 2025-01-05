import React, { useState } from 'react';
import { Search, SlidersHorizontal, ExternalLink } from 'lucide-react';
import './CompanyDashboard.css';
import initialData from './companies_score.json'

const CompanyDashboard = () => {
  const [data] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('final_score');
  const [ascending, setAscending] = useState(false);


  const filteredAndSortedData = data
    .map(item => {
      // Sanitize and parse the inputs
      const market = parseInt(item.market_adaptability);
      const technical = parseInt(item.technical_complexity);
      return {
        ...item,
        final_score: market * 0.65 + technical * 0.35, // Calculate score
      };
    })
    .sort((a, b) => {
      const aValue = parseFloat(a[sortBy]);
      const bValue = parseFloat(b[sortBy]);
      return ascending ? aValue - bValue : bValue - aValue;
    });
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Company Analysis Dashboard</h1>
        
        <div className="controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sort-controls">
            <SlidersHorizontal className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="final_score">Final Score</option>
              <option value="technical_complexity">Technical Complexity</option>
              <option value="market_adaptability">Market Adaptability</option>
            </select>
            <button
              className="sort-direction"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {filteredAndSortedData.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <div className="score-badge">
                {item.final_score}/10
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                <ExternalLink />
              </a>
            </div>
            
            <div className="metrics">
              <div className="metric">
                <span className="metric-label">Technical</span>
                <span className="metric-value">{item.technical_complexity}/10</span>
              </div>
              <div className="metric">
                <span className="metric-label">Market</span>
                <span className="metric-value">{item.market_adaptability}/10</span>
              </div>
            </div>
            
            <div className="card-content">
              <div className="content-section">
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>
              <div className="content-section">
                <h3>MVP</h3>
                <p>{item.mvp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;