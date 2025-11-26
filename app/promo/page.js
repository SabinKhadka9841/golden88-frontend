'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function PromoPage() {
  const [referralCode, setReferralCode] = useState('GOLDEN88XYZ123');
  const [copied, setCopied] = useState(false);
  const [expandedBonus, setExpandedBonus] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBonusDetails = (id) => {
    setExpandedBonus(expandedBonus === id ? null : id);
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const bonuses = [
    {
      id: 1,
      title: 'Partnership Benefits',
      description: 'Exclusive benefits for our valued partners. Join our partnership program and enjoy premium rewards.',
      image: 'https://golden88a.com/media/013b91a566a86e58b16c8.png',
      amount: 'Up to 20%',
      type: 'Partnership',
      terms: 'Partner tier benefits. Revenue sharing model applies.',
      expiry: 'Valid for active partners',
      rules: [
        'Must maintain minimum monthly volume of AUD 5,000',
        'Commission paid monthly on net revenue',
        'Partnership agreement must be signed',
        'Benefits increase with tier progression',
        'Dedicated account manager for Platinum partners'
      ]
    },
    {
      id: 2,
      title: 'Limited Time Deal',
      description: '200% match bonus on your next deposit! This exclusive offer won\'t last long.',
      image: 'https://golden88a.com/media/4c449339e3a86d267f8fb.png',
      amount: '200% Match',
      type: 'Limited Time',
      terms: '200% match up to AUD 1,000. Min deposit AUD 50. 40x wagering.',
      expiry: 'Expires in 7 days',
      rules: [
        'Available for the next 7 days only',
        'Minimum deposit of AUD 50 required',
        'Maximum bonus amount: AUD 1,000',
        '40x wagering requirement on bonus + deposit',
        'Valid on slots and live casino games only'
      ]
    },
    {
      id: 3,
      title: 'Special Free Bonus',
      description: 'No deposit required! Claim your free AUD 25 bonus and start playing immediately.',
      image: 'https://golden88a.com/media/049e616f71a86b9fc14d8.png',
      amount: 'AUD 25 Free',
      type: 'No Deposit',
      terms: 'No deposit needed. 50x wagering. Max cashout AUD 100.',
      expiry: 'Valid for new players',
      rules: [
        'Available for new players only',
        'No deposit required to claim',
        '50x wagering requirement',
        'Maximum cashout limited to AUD 100',
        'Valid for 7 days from activation',
        'Game restrictions may apply'
      ]
    },
    {
      id: 4,
      title: 'Referral Program',
      description: 'Earn Extra Income! Share your code and get 15% lifetime commission on every friend you refer.',
      image: 'https://golden88a.com/media/4c06e30062a8684d99436.png',
      amount: '15% Lifetime',
      type: 'Referral',
      terms: 'Earn 15% commission on all referrals. Paid weekly.',
      expiry: 'Unlimited referrals',
      rules: [
        'Earn 15% commission on all referred player deposits',
        'Commission paid weekly every Monday',
        'Unlimited number of referrals',
        'Lifetime earnings from active referrals',
        'Minimum payout threshold: AUD 50',
        'Referrals must be new players'
      ]
    },
    {
      id: 5,
      title: 'Premium Jackpot X',
      description: 'Progressive jackpot pool exclusive to premium members. Current pool exceeds AUD 50,000!',
      image: 'https://golden88a.com/media/013b91a566a86e58b16c8.png',
      amount: 'AUD 50,000+',
      type: 'Jackpot',
      terms: 'Premium members only. Jackpot drawn monthly.',
      expiry: 'Monthly draw',
      rules: [
        'Exclusive to Premium and VIP members',
        'Automatic entry with every AUD 100 wagered',
        'Jackpot drawn on the last day of each month',
        'Winner takes 70% of the pool',
        'Remaining 30% rolls over to next month',
        'Multiple entries increase winning chances'
      ]
    },
    {
      id: 6,
      title: 'Instant Rebate',
      description: 'Get instant 0.8% rebate on all your bets - win or lose! Credited automatically every day.',
      image: 'https://golden88a.com/media/4c449339e3a86d267f8fb.png',
      amount: '0.8% Daily',
      type: 'Rebate',
      terms: '0.8% instant rebate on all bets. No wagering requirement.',
      expiry: 'Credited daily',
      rules: [
        'Receive 0.8% rebate on all wagers',
        'Calculated on total bet amount (win or lose)',
        'Credited automatically every day at midnight',
        'No wagering requirement - withdraw immediately',
        'Applies to all games',
        'Minimum rebate payout: AUD 1'
      ]
    },
    {
      id: 7,
      title: 'Starter Pack Bonus',
      description: 'Perfect for new players! Get AUD 500 bonus + 100 free spins on your first three deposits.',
      image: 'https://golden88a.com/media/049e616f71a86b9fc14d8.png',
      amount: 'AUD 500 + 100 FS',
      type: 'Welcome Pack',
      terms: '1st: 100% up to AUD 200. 2nd: 50% up to AUD 200. 3rd: 50% up to AUD 100.',
      expiry: 'New players only',
      rules: [
        '1st Deposit: 100% match up to AUD 200 + 50 Free Spins',
        '2nd Deposit: 50% match up to AUD 200 + 30 Free Spins',
        '3rd Deposit: 50% match up to AUD 100 + 20 Free Spins',
        'Minimum deposit AUD 20 per offer',
        '35x wagering requirement on bonus',
        'Free spins valid on selected slots'
      ]
    },
    {
      id: 8,
      title: 'Weekly VIP Benefit',
      description: 'Exclusive perks for our VIP members including cashback, birthday bonuses, and priority support.',
      image: 'https://golden88a.com/media/4c06e30062a8684d99436.png',
      amount: 'Up to 15%',
      type: 'VIP Only',
      terms: 'VIP exclusive. Weekly cashback up to 15%. No wagering.',
      expiry: 'VIP members only',
      rules: [
        'VIP members receive up to 15% weekly cashback',
        'Cashback percentage based on VIP tier',
        'Credited every Monday for previous week',
        'No wagering requirement on cashback',
        'Personal VIP account manager',
        'Exclusive birthday bonuses and gifts',
        'Priority customer support 24/7',
        'Higher withdrawal limits'
      ]
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I claim a bonus?',
      answer: 'To claim a bonus, simply click the "Claim Now" button on the promotion you want. Make sure you meet the eligibility requirements. Some bonuses are credited automatically, while others may require a bonus code during deposit.'
    },
    {
      id: 2,
      question: 'What are wagering requirements?',
      answer: 'Wagering requirements determine how many times you must bet the bonus amount before you can withdraw winnings. For example, a 35x wagering requirement on a AUD 100 bonus means you need to wager AUD 3,500 (100 x 35) before withdrawal.'
    },
    {
      id: 3,
      question: 'Can I have multiple bonuses active at once?',
      answer: 'Generally, only one bonus can be active at a time unless specifically stated otherwise. You must complete the wagering requirements of your current bonus before claiming another one.'
    },
    {
      id: 4,
      question: 'How long do I have to use a bonus?',
      answer: 'Bonus validity periods vary by promotion. Most bonuses are valid for 7-30 days from the time of claiming. Check the specific terms for each promotion. Unused bonuses will expire after the validity period.'
    },
    {
      id: 5,
      question: 'Are there any game restrictions?',
      answer: 'Yes, some bonuses may be restricted to specific games or game categories. Typically, slots contribute 100% to wagering requirements, while table games may contribute less (usually 10-20%) or not at all. Check individual bonus terms.'
    },
    {
      id: 6,
      question: 'How does the referral program work?',
      answer: 'Share your unique referral code with friends. When they register and make their first deposit, you earn commission on their deposits. The more active referrals you have, the higher your commission tier and earnings.'
    },
    {
      id: 7,
      question: 'What is the minimum withdrawal amount for bonuses?',
      answer: 'The minimum withdrawal amount is typically AUD 20. However, you must complete all wagering requirements and meet any maximum cashout limits specified in the bonus terms before withdrawing.'
    },
    {
      id: 8,
      question: 'How do I become a VIP member?',
      answer: 'VIP status is earned through consistent play and loyalty. Our VIP team monitors player activity and sends invitations to eligible players. Factors include deposit frequency, wagering volume, and account tenure.'
    }
  ];

  return (
    <div className="promo-page-container">
      <Link href="/" className="promo-back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>

      <div className="promo-header">
        <Link href="/">
          <img
            className="promo-logo"
            src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif"
            alt="Golden88 Logo"
          />
        </Link>
        <h1 className="promo-main-title">Promotions & Bonuses</h1>
        <p className="promo-subtitle">Exclusive offers and rewards for GOLDEN88 members</p>
      </div>

      <div className="promo-content">
        {/* Referral Code Section */}
        <section className="referral-code-section">
          <div className="referral-code-card">
            <h3>Your Referral Code</h3>
            <div className="referral-code-box">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="referral-code-input"
              />
              <button onClick={handleCopyCode} className="copy-btn">
                {copied ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="referral-hint">Share this code and earn 15% lifetime commission!</p>
          </div>
        </section>

        {/* Bonuses Section */}
        <section className="bonuses-section">
          <div className="section-header">
            <h2>Available Promotions</h2>
            <p>Choose from our exclusive bonus offers and maximize your winning potential</p>
          </div>

          <div className="bonuses-grid">
            {bonuses.map((bonus) => (
              <div key={bonus.id} className="bonus-card">
                <div className="bonus-image">
                  <img src={bonus.image} alt={bonus.title} />
                  <div className="bonus-badge">{bonus.type}</div>
                </div>
                <div className="bonus-content">
                  <h3>{bonus.title}</h3>
                  <div className="bonus-amount">{bonus.amount}</div>
                  <p className="bonus-description">{bonus.description}</p>
                  <div className="bonus-details">
                    <div className="bonus-terms">
                      <strong>Terms:</strong> {bonus.terms}
                    </div>
                    <div className="bonus-expiry">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      {bonus.expiry}
                    </div>
                  </div>

                  {/* Collapsible Rules Section */}
                  <div className="rules-section">
                    <button
                      className="read-more-btn"
                      onClick={() => toggleBonusDetails(bonus.id)}
                    >
                      {expandedBonus === bonus.id ? 'Hide Rules' : 'Read More Rules'}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ transform: expandedBonus === bonus.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>

                    {expandedBonus === bonus.id && (
                      <div className="rules-content">
                        <h4>Detailed Rules & Requirements:</h4>
                        <ul>
                          {bonus.rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button className="claim-btn">Claim Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our promotions and bonuses</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {expandedFAQ === faq.id && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* General Terms */}
        <section className="terms-section">
          <div className="section-header">
            <h2>General Terms & Conditions</h2>
          </div>
          <div className="terms-content">
            <ul>
              <li>All bonuses are subject to wagering requirements before withdrawal</li>
              <li>GOLDEN88 reserves the right to modify or cancel promotions at any time</li>
              <li>Only one bonus can be active per account at a time unless stated otherwise</li>
              <li>Maximum bonus amounts and limits apply to all promotional offers</li>
              <li>Players must be 18+ and comply with local gambling regulations</li>
              <li>Bonuses cannot be combined unless explicitly stated in the promotion</li>
              <li>Abuse of promotional offers may result in bonus forfeiture and account suspension</li>
              <li>Wagering requirements must be met within the specified timeframe</li>
              <li>Some games may be restricted or contribute differently to wagering requirements</li>
              <li>GOLDEN88's decision on all bonus-related matters is final</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="promo-page-footer">
        <p>© 2024 GOLDEN88. ALL RIGHTS RESERVED.</p>
        <p>YOUR GOLDEN GATEWAY TO BIG WINS.</p>
      </div>
    </div>
  );
}
