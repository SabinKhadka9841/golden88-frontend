'use client';

import React from 'react';

export default function BottomInfo() {
  return (
    <div className="bottom-info-section">
      <div className="bottom-info-container">
        {/* Row 1: Game License, Certifications, Security */}
        <div className="bottom-info-grid-top">
          {/* Game License */}
          <div className="bottom-info-column">
            <h3 className="bottom-info-title">GAME LICENSE</h3>
            <div className="bottom-info-logos">
              <img
                src="https://golden88a.com/media/c0f0c2c0a1a86d9b8dc5e.png"
                alt="Gaming Curacao"
                className="bottom-info-logo"
              />
            </div>
            <p className="bottom-info-text">LICENSED & REGULATED</p>
          </div>

          {/* Certifications */}
          <div className="bottom-info-column">
            <h3 className="bottom-info-title">CERTIFICATIONS</h3>
            <div className="bottom-info-logos">
              <img
                src="https://golden88a.com/media/8e9d3f2b1ca86dc8e5f7a.png"
                alt="BMM Testlabs"
                className="bottom-info-logo"
              />
              <img
                src="https://golden88a.com/media/7f8e4c3d2ba86ed9f6g8b.png"
                alt="iTech Labs"
                className="bottom-info-logo"
              />
            </div>
          </div>

          {/* Security */}
          <div className="bottom-info-column">
            <h3 className="bottom-info-title">SECURITY</h3>
            <div className="bottom-info-logos">
              <div className="security-icon">
                <svg className="bottom-info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                <span>SSL</span>
              </div>
              <div className="security-icon">
                <svg className="bottom-info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span>SECURE</span>
              </div>
              <div className="security-icon">
                <svg className="bottom-info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Follow Us, Payment Methods */}
        <div className="bottom-info-grid-bottom">
          {/* Follow Us */}
          <div className="bottom-info-column">
            <h3 className="bottom-info-title">FOLLOW US</h3>
            <div className="bottom-info-logos">
              <img
                src="https://golden88a.com/media/20e2311f44a861d9a0d16.png"
                alt="Facebook"
                className="bottom-info-logo-social"
              />
              <div className="social-icon-placeholder">
                <svg className="bottom-info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="social-icon-placeholder">
                <svg className="bottom-info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bottom-info-column-payment">
            <h3 className="bottom-info-title">PAYMENT METHODS</h3>
            <div className="payment-logos-grid">
              <div className="payment-logo-item">VISA</div>
              <div className="payment-logo-item">MASTERCARD</div>
              <div className="payment-logo-item">ANZ</div>
              <div className="payment-logo-item">NAB</div>
              <div className="payment-logo-item">CBA</div>
              <div className="payment-logo-item">WESTPAC</div>
              <div className="payment-logo-item">BTC</div>
              <div className="payment-logo-item">USDT</div>
              <div className="payment-logo-item">ETH</div>
              <div className="payment-logo-item">MATIC</div>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="bottom-info-footer">
          <p>© 2024 GOLDEN88. ALL RIGHTS RESERVED. YOUR GOLDEN GATEWAY TO BIG WINS.</p>
          <p className="disclaimer-text">18+ | PLAY RESPONSIBLY | GAMBLING CAN BE ADDICTIVE</p>
        </div>
      </div>
    </div>
  );
}
