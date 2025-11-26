'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Marquee from '../components/Marquee';
import BottomInfo from '../components/BottomInfo';

// --- Comprehensive Data Store ---
const gameCategories = [
    { id: 10, name: "Event", icon: 'https://golden88a.com/media/867626ca43a862eefba5c.png', selectedIcon: 'https://golden88a.com/media/4fd4d8da43a869d3562cd.png' },
    { id: 11, name: "Slot", icon: 'https://golden88a.com/media/551569ca43a86dc734829.png', selectedIcon: 'https://golden88a.com/media/f51c16ea43a86bd432ba9.png' },
    { id: 12, name: "Live", icon: 'https://golden88a.com/media/7fad2cca43a860fc6d880.png', selectedIcon: 'https://golden88a.com/media/f5457fea43a8613182d11.png' },
    { id: 13, name: "Sport", icon: 'https://golden88a.com/media/30579eca43a8657fc942c.png', selectedIcon: 'https://golden88a.com/media/203898fa43a86659ec8f1.png' },
    { id: 14, name: "Other", icon: 'https://golden88a.com/media/1d9607519e2865d49ec2a.png', selectedIcon: 'https://golden88a.com/media/4672e0919e2862d02c40c.png' },
];
const games = [
    { name: 'Gates of Olympus', category: 10, image: 'https://golden88a.com/media/4c4e0d2cb9a86d5945b9c.png', provider: 'Pragmatic Play', rtp: '96.5%' },
    { name: 'Sweet Bonanza', category: 10, image: 'https://golden88a.com/media/9e8f933cb9a86c63c7445.png', provider: 'Pragmatic Play', rtp: '96.48%' },
    { name: 'Starlight Princess', category: 10, image: 'https://golden88a.com/media/579cb2a61ba8600056bdf.png', provider: 'Pragmatic Play', rtp: '96.5%' },
    { name: 'Mahjong Ways 2', category: 11, image: 'https://golden88a.com/media/8d7b0e4754a868c7e2b67.png', provider: 'PG Soft', rtp: '96.95%' },
    { name: 'Lucky Neko', category: 11, image: 'https://golden88a.com/media/f39e73c71ba861df79db4.png', provider: 'PG Soft', rtp: '96.73%' },
    { name: 'Crazy Time', category: 12, image: 'https://golden88a.com/media/70c2f4550ca865ef26d7e.png', provider: 'Evolution Gaming', rtp: '96.08%' },
    { name: 'Lightning Roulette', category: 12, image: 'https://golden88a.com/media/f38767e754a86a2ff5a4f.png', provider: 'Evolution Gaming', rtp: '97.3%' },
    { name: 'SBOBET Football', category: 13, image: 'https://golden88a.com/media/ce3e8bc854a8645cbb545.png', provider: 'SBOBET', rtp: 'N/A' },
    { name: 'M8Bet Horse Racing', category: 13, image: 'https://golden88a.com/media/98e8a3d854a86067a216f.png', provider: 'M8Bet', rtp: 'N/A' },
    { name: 'Arcade Brawler', category: 14, image: null, provider: 'Demo Provider', rtp: '95%' },
];
const leftSidebarGameList = [
    { name: 'JOKER GAMING', rtp: '96.30', image: 'https://golden88a.com/media/8d7b0e4754a868c7e2b67.png' },
    { name: 'PRAGMATIC PLAY', rtp: '93.80', image: 'https://golden88a.com/media/4c4e0d2cb9a86d5945b9c.png' },
];
const allTransactions = [
    { depositUser: '61******270', depositAmount: 'AUD 83.00', withdrawUser: '61******239', withdrawAmount: 'AUD 15.00', game: 'JOKER' },
    { depositUser: '61******903', depositAmount: 'AUD 15.00', withdrawUser: '61******334', withdrawAmount: 'AUD 50.26', game: 'VP' },
    { depositUser: '61******837', depositAmount: 'AUD 10.00', withdrawUser: '61******837', withdrawAmount: 'AUD 10.00', game: 'JOKER' },
    { depositUser: '61******270', depositAmount: 'AUD 100.00', withdrawUser: '61******592', withdrawAmount: 'AUD 15.00', game: 'UUS2' },
    { depositUser: '61******111', depositAmount: 'AUD 25.00', withdrawUser: '61******222', withdrawAmount: 'AUD 75.00', game: 'EVO888' },
];
const reviews = [
    { text: '"GOLDEN88 paid me every cent I won—fast, fair, and without any hassle."', author: 'Daniel Harris' },
    { text: '"No delays, no excuses. GOLDEN88 always delivers smooth withdrawals I can trust."', author: 'Andrew Scott' },
    { text: '"After trying so many sites, only GOLDEN88 gave me real peace of mind with honest payouts."', author: 'Jason Clark' },
];

// --- Reusable Components ---
const PlaceholderSVG = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="placeholder-svg"><rect width="100" height="100" fill="#1a0528" /><text x="50" y="55" textAnchor="middle" fill="#d4af37" fontSize="48">?</text></svg>);
const GameItem = ({ game, onClick }) => (<div className="game-item" onClick={onClick}>{game.image ? (<div className="game-item-image" style={{ backgroundImage: `url(${game.image})` }}></div>) : (<PlaceholderSVG />)}<div className="game-item-overlay"><span>{game.name}</span></div></div>);
const PlaceholderGameGrid = () => (
    <div className="placeholder-game-grid">
        {['AdvantPlay', 'UUS2', 'EVO888H5B', 'Rich Gaming', 'Joker'].map((provider, index) => (
            <div key={index} className="placeholder-game-provider">
                <img src={`https://golden88a.com/media/${['6077759a22a865b206ce5', '706a92f073a86c623910c', '579cb2a61ba8600056bdf', 'a362799307a869085ec3c', 'b4a8e8f007a8612140a33'][index]}.png`} alt={provider} />
                <span>{provider}</span>
            </div>
        ))}
    </div>
);


// --- Main App Components ---
const Header = ({ onOpenNav, isLoggedIn, balance, onLogout }) => (
    <div id="header">
        <span className="openbtn" onClick={onOpenNav}><img src="https://inskingdom8.com/media/b37b94590d6765873eeca.gif" alt="menu" /></span>
        <a href="#home"><img className="logo" src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif" alt="Golden88 Logo" /></a>
        <div className="header-info-right">
            <button className="golden88-btn">#GOLDEN88</button>
            {isLoggedIn && <div className="header-user-info"><span>Balance: AUD {balance.toFixed(2)}</span><button onClick={onLogout}>Logout</button></div>}
        </div>
    </div>
);

const SideNav = ({ isOpen, closeNav, onLogout }) => {
    return (
        <div id="mySidenav" className="sidenav" style={{ left: isOpen ? '0' : '-280px' }}>
            <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
            <div className="sidenav-menu">
                <Link href="/plinko" className="sidenav-item" onClick={closeNav}>
                    <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line x1="12" y1="2" x2="12" y2="6"/>
                        <line x1="12" y1="18" x2="12" y2="22"/>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                        <line x1="2" y1="12" x2="6" y2="12"/>
                        <line x1="18" y1="12" x2="22" y2="12"/>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                    </svg>
                    <span>Plinko Ball</span>
                </Link>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                        </svg>
                        <span>VIP Programs</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            <path d="M12 6v12M8 12h8"/>
                        </svg>
                        <span>Top 10 Deposit Tournaments</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="6"/>
                            <path d="M12 14v7M8 17l4 4 4-4"/>
                            <path d="M17 3l-5 5-5-5"/>
                        </svg>
                        <span>Top 10 Withdraw Tournaments</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        </svg>
                        <span>RTP Today</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        <span>Game Tips</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                            <path d="M12 18h.01"/>
                            <path d="M12 6v6"/>
                            <path d="M16 10l-4-4-4 4"/>
                        </svg>
                        <span>Download Apps</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M2 12h20"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Language</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>Follow Us</span>
                    </a>
                    <a href="#" className="sidenav-item">
                        <svg className="sidenav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="8.5" cy="7" r="4"/>
                            <polyline points="17 11 19 13 23 9"/>
                        </svg>
                        <span>Partnership</span>
                    </a>
                </div>
        </div>
    );
};

const LiveTransactions = () => {
    const [transactions, setTransactions] = useState(allTransactions.slice(0, 5));
    useEffect(() => {
        const interval = setInterval(() => { setTransactions(prev => { const newArray = [...prev]; const lastItem = newArray.pop(); newArray.unshift(lastItem); return newArray; }); }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="widget live-transactions">
            <h4>Live Transaction <span className="live-dot"></span></h4>
            <table>
                <thead><tr><td>DEPOSIT</td><td>WITHDRAW</td><td>GAME</td></tr></thead>
                <tbody>{transactions.map((tx, index) => (<tr key={index}><td>{tx.depositUser} <br/> <span>{tx.depositAmount}</span></td><td>{tx.withdrawUser} <br/> <span>{tx.withdrawAmount}</span></td><td>{tx.game}</td></tr>))}</tbody>
            </table>
        </div>
    );
};

const LeftSidebar = () => (
    <div className="left-column">
        <div className="widget info-poster">
            <img src="https://golden88a.com/media/013b91a566a86e58b16c8.png" alt="New Register Bonus" />
            <img src="https://golden88a.com/media/4c449339e3a86d267f8fb.png" alt="Download Apps Bonus" />
        </div>
        <div className="widget live-rtp">
            <h4>RTP LIVE <span className="live-dot"></span></h4>
            <img src="https://golden88a.com/media/aa3b42918e2869ed7385d.gif" alt="RTP Live Placeholder" />
            <p>Track the hottest games in real time</p>
            <p className="small-text">Betting information, transparent and reliable!</p>
        </div>
        <div className="widget social-follow">
            <h4>Follow Us</h4>
            <a href="#" className="social-link"><img src="https://golden88a.com/media/20e2311f44a861d9a0d16.png" alt="Facebook" /><span>Like us on Facebook <br/> To get latest information & promo</span></a>
            <a href="#" className="social-link"><img src="https://golden88a.com/media/1b54a500e3a86c67a7404.png" alt="Telegram" /><span>Join on our Telegram <br/> To get latest information & promo</span></a>
            <a href="#" className="social-link"><img src="https://golden88a.com/media/68297050e3a86c697841c.png" alt="WhatsApp" /><span>Chat on our WhatsApp <br/> To get latest information & promo</span></a>
        </div>
        <LiveTransactions />
        <div className="widget game-list-preview">
            {leftSidebarGameList.map((game, index) => (
                <div key={index} className="game-preview-item">
                    <img src={game.image} alt={game.name} />
                    <div className="game-preview-info">
                        <h5>{game.name}</h5>
                        <p>RTP {game.rtp}%</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const UserLoginPanel = ({ setActivePage }) => {
    const [checkedInDays, setCheckedInDays] = useState(new Array(7).fill(false));
    const [lastCheckInDate, setLastCheckInDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleCheckIn = () => {
        const today = new Date().toDateString();

        if (lastCheckInDate === today) {
            setPopupMessage('Already checked in for today! Come back tomorrow for more rewards.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        const dayOfWeek = new Date().getDay();
        const newCheckedInDays = [...checkedInDays];
        newCheckedInDays[dayOfWeek] = true;
        setCheckedInDays(newCheckedInDays);
        setLastCheckInDate(today);

        setPopupMessage('Check-in successful! +10 points earned!');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <div className="widget login-panel">
            <div className="balance-info-top">Balance: <span>AUD 0.00</span> (Reload)</div>

            {showPopup && (
                <div className="check-in-popup">
                    <div className="popup-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}

            {/* Daily Check-in Section */}
            <div className="check-in-section">
                <div className="check-in-widget">
                    <div className="check-in-header">Check in daily to earn point<button type="button" onClick={handleCheckIn}>Check In</button></div>
                    <div className="calendar-grid">
                        {checkedInDays.map((isChecked, index) => (
                            <div key={index} className={`day-cell ${isChecked ? 'checked-in' : ''}`}>
                                {index === 6 ? (
                                    <svg className="day-icon present-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="8" width="18" height="4" rx="1"/>
                                        <rect x="4" y="12" width="16" height="9" rx="1"/>
                                        <path d="M12 8v13"/>
                                        <path d="M3 12h18"/>
                                        <path d="M12 8c0-1.5-1-3-3-3s-2 1.5-2 3"/>
                                        <path d="M12 8c0-1.5 1-3 3-3s2 1.5 2 3"/>
                                    </svg>
                                ) : (
                                    <svg className="day-icon calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                        <text x="12" y="17" fontSize="8" fill="currentColor" textAnchor="middle" fontWeight="bold">{index + 1}</text>
                                    </svg>
                                )}
                                <span>Day {index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="action-buttons-section">
                <div className="login-actions-group">
                    <button type="button" className="login-btn" onClick={() => setActivePage('login')}>Login</button>
                    <button type="button" className="register-btn" onClick={() => setActivePage('register')}>Register</button>
                </div>
                <div className="balance-actions-container">
                    <div className="balance-actions-left">
                        <div className="balance-info-detail">
                            <div className="balance-amount">Balance: AUD 0.00</div>
                            <div className="balance-limits">
                                <div>Minimum Deposit: $15</div>
                                <div>Minimum Withdrawal: $50</div>
                            </div>
                        </div>
                    </div>
                    <div className="balance-actions-right">
                        <button type="button" className="deposit-btn">Deposit</button>
                        <button type="button" className="withdraw-btn">Withdraw</button>
                        <button type="button" className="refresh-btn">Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserDashboard = ({ username, balance, onLogout }) => {
    const [checkedInDays, setCheckedInDays] = useState(new Array(7).fill(false));
    const [lastCheckInDate, setLastCheckInDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleCheckIn = () => {
        const today = new Date().toDateString();

        if (lastCheckInDate === today) {
            setPopupMessage('Already checked in for today! Come back tomorrow for more rewards.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        const dayOfWeek = new Date().getDay();
        const newCheckedInDays = [...checkedInDays];
        newCheckedInDays[dayOfWeek] = true;
        setCheckedInDays(newCheckedInDays);
        setLastCheckInDate(today);

        setPopupMessage('Check-in successful! +10 points earned!');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <div className="widget login-panel">
            <div className="welcome-message">Welcome, <strong>{username}</strong>!</div>
            <div className="balance-display">Balance: <span>AUD {balance.toFixed(2)}</span><button className="refresh-btn">Refresh</button></div>

            {showPopup && (
                <div className="check-in-popup">
                    <div className="popup-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}

            {/* Daily Check-in Section */}
            <div className="check-in-section">
                <div className="check-in-widget">
                    <div className="check-in-header">Check in daily to earn point<button onClick={handleCheckIn}>Check In</button></div>
                    <div className="calendar-grid">
                        {checkedInDays.map((isChecked, index) => (
                            <div key={index} className={`day-cell ${isChecked ? 'checked-in' : ''}`}>
                                {index === 6 ? (
                                    <svg className="day-icon present-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="8" width="18" height="4" rx="1"/>
                                        <rect x="4" y="12" width="16" height="9" rx="1"/>
                                        <path d="M12 8v13"/>
                                        <path d="M3 12h18"/>
                                        <path d="M12 8c0-1.5-1-3-3-3s-2 1.5-2 3"/>
                                        <path d="M12 8c0-1.5 1-3 3-3s2 1.5 2 3"/>
                                    </svg>
                                ) : (
                                    <svg className="day-icon calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                        <text x="12" y="17" fontSize="8" fill="currentColor" textAnchor="middle" fontWeight="bold">{index + 1}</text>
                                    </svg>
                                )}
                                <span>Day {index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="action-buttons-section">
                <div className="balance-actions-container">
                    <div className="balance-actions-left">
                        <div className="balance-info-detail">
                            <div className="balance-amount">Balance: AUD {balance.toFixed(2)}</div>
                            <div className="balance-limits">
                                <div>Minimum Deposit: $15</div>
                                <div>Minimum Withdrawal: $50</div>
                            </div>
                        </div>
                    </div>
                    <div className="balance-actions-right">
                        <button className="deposit-btn">Deposit</button>
                        <button className="withdraw-btn">Withdraw</button>
                        <button className="refresh-btn">Refresh</button>
                        <button className="logout-btn" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RightSidebar = ({ isLoggedIn, username, balance, onLogout, onLogin, setActivePage }) => (
    <div className="right-column">
        <div className="widget partnership-video">
            <div className="video-player-placeholder">
                <img src="https://golden88a.com/media/5e05d2e052a8677c7c34d.png" alt="88 Partnership Video Thumbnail" />
                <div className="video-overlay">
                    <img src="https://golden88a.com/media/37f8f43054a8677f98c76.png" alt="Play Icon" className="play-icon" />
                    <div className="video-controls">
                        <span>01:21</span>
                        <div className="progress-bar"></div>
                        <img src="https://golden88a.com/media/ed10223054a86326e7a27.png" alt="Mute" className="mute-icon" />
                    </div>
                </div>
            </div>
            <div className="partnership-text">
                <p><span>88 Partnership</span></p>
                <p>Welcome to GOLDEN88 Service is our priority</p>
            </div>
        </div>
        {isLoggedIn ? <UserDashboard username={username} balance={balance} onLogout={onLogout} /> : <UserLoginPanel setActivePage={setActivePage} />}
        <div className="widget info-poster-bottom">
            <img src="https://golden88a.com/media/049e616f71a86b9fc14d8.png" alt="Free Hari Hari" />
            <img src="https://golden88a.com/media/4c06e30062a8684d99436.png" alt="Free Claim" />
        </div>
    </div>
);

const TrustBadges = () => (
    <div className="widget trust-badges">
        <div className="badge-section license">
            <h5>Game License</h5>
            <img src="https://golden88a.com/media/010a72734d586cb7d0631.jpg" alt="Gaming Curacao License" />
        </div>
        <div className="badge-section security">
            <h5>Certifications & Security</h5>
            <div className="security-icons">
                <img src="https://golden88a.com/media/b0fb7de04d5866da96b10.png" alt="Certifications" />
                <img src="https://golden88a.com/media/81d0c8014d586dc6e969b.png" alt="Security" />
            </div>
        </div>
        <div className="badge-section payments">
            <h5>Payment Methods</h5>
            <div className="payment-icons">
                <img src="https://ridgydidgebets.com/media/5ca3598154176fa645564.png" alt="PayID" />
                <img src="https://ridgydidgebets.com/media/f4871591541766d255b9c.jpg" alt="Crypto" />
                <img src="https://ridgydidgebets.com/media/1e8bde915417681d913c1.png" alt="Bank Transfer" />
                <img src="https://golden88a.com/media/944e8c1b48a867a5b3a37.png" alt="ANZ" />
                <img src="https://golden88a.com/media/a9b9a6b148a863b7e732d.png" alt="NAB" />
                <img src="https://golden88a.com/media/1762e1e448a86f9f69704.png" alt="UPay" />
            </div>
        </div>
    </div>
);

const JackpotTicker = () => {
    const [jackpot, setJackpot] = useState(123456.78);
    useEffect(() => { const interval = setInterval(() => { setJackpot(prev => prev + (Math.random() * 0.15)); }, 100); return () => clearInterval(interval); }, []);
    return (<div className="jackpot-ticker-widget"><h4>Progressive Jackpot</h4><div className="jackpot-amount">AUD {jackpot.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>)
}

const ResponsibleGamingSection = () => (
    <div className="responsible-gaming-footer widget">
        <img src="https://golden88a.com/media/a86f5c88e3a860714c330.png" alt="88 Group Partnership" className="group-partnership-logo" />
        <p className="main-text">GOLDEN88 is committed to responsible gaming. Gambling can be addictive. Please play responsibly.</p>
        <p className="copyright-text">© 2024 GOLDEN88. ALL RIGHTS RESERVED. <br />YOUR GOLDEN GATEWAY TO BIG WINS.</p>
    </div>
);

const GameDetailModal = ({ game, onClose }) => {
    if (!game) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                {game.image ? <img src={game.image} alt={game.name} className="modal-game-image"/> : <div className="modal-placeholder-wrapper"><PlaceholderSVG /></div>}
                <h3>{game.name}</h3>
                <div className="game-details"><p><strong>Provider:</strong> {game.provider}</p><p><strong>RTP:</strong> {game.rtp}</p></div>
                <p className="game-description">Experience the thrill of {game.name}, a top-rated game from {game.provider}. With exciting features and big win potential, it&apos;s a player favorite!</p>
                <button className="play-now-btn">Play Now</button>
            </div>
        </div>
    );
};

// --- Page Components ---
const HomePage = ({ onGameClick }) => {
    const [activeCategory, setActiveCategory] = useState(10);
    const filteredGames = games.filter(game => game.category === activeCategory);
    return (
        <div className="middle-column">
            <JackpotTicker />
            <div id="home-game">
                <div className="site-tabs">
                    {gameCategories.map(cat => (
                        <div key={cat.id} className={`site-tab ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                            <img className="no-selected" src={cat.icon} alt={cat.name} />
                            <img className="is-selected" src={cat.selectedIcon} alt={cat.name} />
                        </div>
                    ))}
                </div>
                <div className="game-provider-grid-section">
                    <h4>GOLDEN88 Offer Wide Range Of</h4>
                    <PlaceholderGameGrid />
                </div>
                <div className="game-container">
                    {filteredGames.map(game => (<GameItem key={game.name} game={game} onClick={() => onGameClick(game)} />))}
                </div>
            </div>
            <div className="widget testimonials">
                <p>PLAY. WIN. GET PAID!</p>
                {reviews.map((review, index) => (<div key={index} className="review"><div className="stars">★★★★★</div><p>{review.text}</p><span>- {review.author}</span></div>))}
            </div>
            <TrustBadges />
            <ResponsibleGamingSection />
            <BottomInfo />
        </div>
    );
};

const LoginPage = ({ onLogin }) => {
    const [formData, setFormData] = useState({ usernameOrPhone: '', password: '', rememberMe: false });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.usernameOrPhone.trim()) newErrors.usernameOrPhone = 'Username or phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', formData.usernameOrPhone);
            localStorage.setItem('balance', '1000.00');
            onLogin(formData.usernameOrPhone, 1000);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="middle-column auth-page-content">
            <div className="auth-page-header">
                <img className="auth-logo" src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif" alt="Golden88 Logo" />
                <h1>Welcome Back</h1>
                <p>Login to your GOLDEN88 account</p>
            </div>

            <div className="auth-card-inline">
                <form onSubmit={handleSubmit} className="auth-form-page">
                    <div className="form-group-page">
                        <label htmlFor="usernameOrPhone">Username or Phone Number</label>
                        <input
                            type="text"
                            id="usernameOrPhone"
                            name="usernameOrPhone"
                            value={formData.usernameOrPhone}
                            onChange={handleChange}
                            className={errors.usernameOrPhone ? 'error' : ''}
                            placeholder="Enter your username or phone number"
                        />
                        {errors.usernameOrPhone && <span className="error-message">{errors.usernameOrPhone}</span>}
                    </div>

                    <div className="form-group-page">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-options-page">
                        <label className="checkbox-label-page">
                            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <button type="submit" className="auth-submit-btn-page" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>

            <div className="auth-page-footer-text">
                <p>© 2024 GOLDEN88. ALL RIGHTS RESERVED.</p>
                <p>YOUR GOLDEN GATEWAY TO BIG WINS.</p>
            </div>
        </div>
    );
};

const RegisterPage = ({ onLogin }) => {
    const [formData, setFormData] = useState({ username: '', phone: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', formData.username);
            localStorage.setItem('balance', '1000.00');
            onLogin(formData.username, 1000);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="middle-column auth-page-content">
            <div className="auth-page-header">
                <img className="auth-logo" src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif" alt="Golden88 Logo" />
                <h1>Create Account</h1>
                <p>Join GOLDEN88 today and start winning!</p>
            </div>

            <div className="auth-card-inline">
                <form onSubmit={handleSubmit} className="auth-form-page">
                    <div className="form-group-page">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Choose a username"
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group-page">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group-page">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group-page">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Create a password"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group-page">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="auth-submit-btn-page" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
            </div>

            <div className="auth-page-footer-text">
                <p>© 2024 GOLDEN88. ALL RIGHTS RESERVED.</p>
                <p>YOUR GOLDEN GATEWAY TO BIG WINS.</p>
            </div>
        </div>
    );
};

const PromoPage = () => {
    const [referralCode] = useState('GOLDEN88XYZ123');
    const [copied, setCopied] = useState(false);
    const [expandedBonus, setExpandedBonus] = useState(null);
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const bonuses = [
        { id: 1, title: 'Partnership Benefits', description: 'Exclusive benefits for our valued partners. Join our partnership program and enjoy premium rewards.', image: 'https://golden88a.com/media/013b91a566a86e58b16c8.png', amount: 'Up to 20%', type: 'Partnership', terms: 'Partner tier benefits. Revenue sharing model applies.', expiry: 'Valid for active partners', rules: ['Must maintain minimum monthly volume of AUD 5,000', 'Commission paid monthly on net revenue', 'Partnership agreement must be signed', 'Benefits increase with tier progression', 'Dedicated account manager for Platinum partners'] },
        { id: 2, title: 'Limited Time Deal', description: '200% match bonus on your next deposit! This exclusive offer won\'t last long.', image: 'https://golden88a.com/media/4c449339e3a86d267f8fb.png', amount: '200% Match', type: 'Limited Time', terms: '200% match up to AUD 1,000. Min deposit AUD 50. 40x wagering.', expiry: 'Expires in 7 days', rules: ['Available for the next 7 days only', 'Minimum deposit of AUD 50 required', 'Maximum bonus amount: AUD 1,000', '40x wagering requirement on bonus + deposit', 'Valid on slots and live casino games only'] },
        { id: 3, title: 'Special Free Bonus', description: 'No deposit required! Claim your free AUD 25 bonus and start playing immediately.', image: 'https://golden88a.com/media/049e616f71a86b9fc14d8.png', amount: 'AUD 25 Free', type: 'No Deposit', terms: 'No deposit needed. 50x wagering. Max cashout AUD 100.', expiry: 'Valid for new players', rules: ['Available for new players only', 'No deposit required to claim', '50x wagering requirement', 'Maximum cashout limited to AUD 100', 'Valid for 7 days from activation', 'Game restrictions may apply'] },
        { id: 4, title: 'Referral Program', description: 'Earn Extra Income! Share your code and get 15% lifetime commission on every friend you refer.', image: 'https://golden88a.com/media/4c06e30062a8684d99436.png', amount: '15% Lifetime', type: 'Referral', terms: 'Earn 15% commission on all referrals. Paid weekly.', expiry: 'Unlimited referrals', rules: ['Earn 15% commission on all referred player deposits', 'Commission paid weekly every Monday', 'Unlimited number of referrals', 'Lifetime earnings from active referrals', 'Minimum payout threshold: AUD 50', 'Referrals must be new players'] },
        { id: 5, title: 'Premium Jackpot X', description: 'Progressive jackpot pool exclusive to premium members. Current pool exceeds AUD 50,000!', image: 'https://golden88a.com/media/013b91a566a86e58b16c8.png', amount: 'AUD 50,000+', type: 'Jackpot', terms: 'Premium members only. Jackpot drawn monthly.', expiry: 'Monthly draw', rules: ['Exclusive to Premium and VIP members', 'Automatic entry with every AUD 100 wagered', 'Jackpot drawn on the last day of each month', 'Winner takes 70% of the pool', 'Remaining 30% rolls over to next month', 'Multiple entries increase winning chances'] },
        { id: 6, title: 'Instant Rebate', description: 'Get instant 0.8% rebate on all your bets - win or lose! Credited automatically every day.', image: 'https://golden88a.com/media/4c449339e3a86d267f8fb.png', amount: '0.8% Daily', type: 'Rebate', terms: '0.8% instant rebate on all bets. No wagering requirement.', expiry: 'Credited daily', rules: ['Receive 0.8% rebate on all wagers', 'Calculated on total bet amount (win or lose)', 'Credited automatically every day at midnight', 'No wagering requirement - withdraw immediately', 'Applies to all games', 'Minimum rebate payout: AUD 1'] },
        { id: 7, title: 'Starter Pack Bonus', description: 'Perfect for new players! Get AUD 500 bonus + 100 free spins on your first three deposits.', image: 'https://golden88a.com/media/049e616f71a86b9fc14d8.png', amount: 'AUD 500 + 100 FS', type: 'Welcome Pack', terms: '1st: 100% up to AUD 200. 2nd: 50% up to AUD 200. 3rd: 50% up to AUD 100.', expiry: 'New players only', rules: ['1st Deposit: 100% match up to AUD 200 + 50 Free Spins', '2nd Deposit: 50% match up to AUD 200 + 30 Free Spins', '3rd Deposit: 50% match up to AUD 100 + 20 Free Spins', 'Minimum deposit AUD 20 per offer', '35x wagering requirement on bonus', 'Free spins valid on selected slots'] },
        { id: 8, title: 'Weekly VIP Benefit', description: 'Exclusive perks for our VIP members including cashback, birthday bonuses, and priority support.', image: 'https://golden88a.com/media/4c06e30062a8684d99436.png', amount: 'Up to 15%', type: 'VIP Only', terms: 'VIP exclusive. Weekly cashback up to 15%. No wagering.', expiry: 'VIP members only', rules: ['VIP members receive up to 15% weekly cashback', 'Cashback percentage based on VIP tier', 'Credited every Monday for previous week', 'No wagering requirement on cashback', 'Personal VIP account manager', 'Exclusive birthday bonuses and gifts', 'Priority customer support 24/7', 'Higher withdrawal limits'] }
    ];

    const faqs = [
        { id: 1, question: 'How do I claim a bonus?', answer: 'To claim a bonus, simply click the "Claim Now" button on the promotion you want. Make sure you meet the eligibility requirements. Some bonuses are credited automatically, while others may require a bonus code during deposit.' },
        { id: 2, question: 'What are wagering requirements?', answer: 'Wagering requirements determine how many times you must bet the bonus amount before you can withdraw winnings. For example, a 35x wagering requirement on a AUD 100 bonus means you need to wager AUD 3,500 (100 x 35) before withdrawal.' },
        { id: 3, question: 'Can I have multiple bonuses active at once?', answer: 'Generally, only one bonus can be active at a time unless specifically stated otherwise. You must complete the wagering requirements of your current bonus before claiming another one.' },
        { id: 4, question: 'How long do I have to use a bonus?', answer: 'Bonus validity periods vary by promotion. Most bonuses are valid for 7-30 days from the time of claiming. Check the specific terms for each promotion. Unused bonuses will expire after the validity period.' },
        { id: 5, question: 'Are there any game restrictions?', answer: 'Yes, some bonuses may be restricted to specific games or game categories. Typically, slots contribute 100% to wagering requirements, while table games may contribute less (usually 10-20%) or not at all. Check individual bonus terms.' },
        { id: 6, question: 'How does the referral program work?', answer: 'Share your unique referral code with friends. When they register and make their first deposit, you earn commission on their deposits. The more active referrals you have, the higher your commission tier and earnings.' },
        { id: 7, question: 'What is the minimum withdrawal amount for bonuses?', answer: 'The minimum withdrawal amount is typically AUD 20. However, you must complete all wagering requirements and meet any maximum cashout limits specified in the bonus terms before withdrawing.' },
        { id: 8, question: 'How do I become a VIP member?', answer: 'VIP status is earned through consistent play and loyalty. Our VIP team monitors player activity and sends invitations to eligible players. Factors include deposit frequency, wagering volume, and account tenure.' }
    ];

    return (
        <div className="middle-column promo-page-content">
            <div className="promo-page-header">
                <h1>Promotions & Bonuses</h1>
                <p>Exclusive offers and rewards for GOLDEN88 members</p>
            </div>

            <div className="referral-code-card-inline">
                <h3>Your Referral Code</h3>
                <div className="referral-code-box">
                    <input type="text" value={referralCode} readOnly className="referral-code-input" />
                    <button onClick={handleCopyCode} className="copy-btn-inline">
                        {copied ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> Copied!</>) : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy</>)}
                    </button>
                </div>
                <p className="referral-hint-inline">Share this code and earn 15% lifetime commission!</p>
            </div>

            <div className="bonuses-grid-inline">
                {bonuses.map((bonus) => (
                    <div key={bonus.id} className="bonus-card-inline">
                        <div className="bonus-image-inline">
                            <img src={bonus.image} alt={bonus.title} />
                            <div className="bonus-badge-inline">{bonus.type}</div>
                        </div>
                        <div className="bonus-content-inline">
                            <h3>{bonus.title}</h3>
                            <div className="bonus-amount-inline">{bonus.amount}</div>
                            <p className="bonus-description-inline">{bonus.description}</p>
                            <div className="bonus-details-inline">
                                <div className="bonus-terms-inline"><strong>Terms:</strong> {bonus.terms}</div>
                                <div className="bonus-expiry-inline">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                    {bonus.expiry}
                                </div>
                            </div>
                            <button className="read-more-btn-inline" onClick={() => setExpandedBonus(expandedBonus === bonus.id ? null : bonus.id)}>
                                {expandedBonus === bonus.id ? 'Hide Rules' : 'Read More Rules'}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedBonus === bonus.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {expandedBonus === bonus.id && (
                                <div className="rules-content-inline">
                                    <h4>Detailed Rules:</h4>
                                    <ul>{bonus.rules.map((rule, idx) => (<li key={idx}>{rule}</li>))}</ul>
                                </div>
                            )}
                            <button className="claim-btn-inline">Claim Now</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="faq-section-inline">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq) => (
                    <div key={faq.id} className="faq-item-inline">
                        <button className="faq-question-inline" onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}>
                            <span>{faq.question}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {expandedFAQ === faq.id && (<div className="faq-answer-inline">{faq.answer}</div>)}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'support', text: 'Welcome to GOLDEN88 Live Chat! How can we help you today?', time: '10:30 AM', avatar: 'https://golden88a.com/media/27c7b222e2a861a6d972e.gif' },
        { id: 2, sender: 'user', text: 'Hello! I have a question about deposits.', time: '10:31 AM' },
        { id: 3, sender: 'support', text: 'I\'d be happy to help! What would you like to know about deposits?', time: '10:31 AM', avatar: 'https://golden88a.com/media/27c7b222e2a861a6d972e.gif' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = React.useRef(null);

    const quickReplies = [
        { id: 1, text: 'How to deposit?', category: 'deposit' },
        { id: 2, text: 'Withdrawal process?', category: 'withdrawal' },
        { id: 3, text: 'Bonus terms?', category: 'bonus' },
        { id: 4, text: 'Account verification?', category: 'account' },
        { id: 5, text: 'Payment methods?', category: 'payment' },
        { id: 6, text: 'Game issues?', category: 'technical' }
    ];

    const autoResponses = {
        deposit: 'To make a deposit: 1) Log into your account 2) Click "Deposit" 3) Choose your payment method 4) Enter amount (minimum AUD 20) 5) Confirm transaction. Deposits are instant!',
        withdrawal: 'To withdraw: 1) Verify your account 2) Click "Withdraw" 3) Enter amount (minimum AUD 20) 4) Choose method 5) Confirm. Withdrawals process within 24-48 hours.',
        bonus: 'All bonuses have wagering requirements. Check the specific terms for each promotion on our Promo page. First deposit bonus is 100% up to AUD 200!',
        account: 'Account verification requires: 1) Valid ID 2) Proof of address 3) Payment method verification. Submit documents through "My Account" section.',
        payment: 'We accept: Bank Transfer (ANZ, NAB, CBA, Westpac), PayID, Cryptocurrencies (BTC, USDT, ETH), and major credit cards. All transactions are secure!',
        technical: 'For game issues: 1) Clear browser cache 2) Try different browser 3) Check internet connection. Still having issues? Our tech team is here 24/7!',
        general: 'How can I assist you today? Choose from quick replies or type your question!'
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                const newUserMessage = {
                    id: messages.length + 1,
                    sender: 'user',
                    image: event.target.result,
                    text: 'Sent an image',
                    time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages([...messages, newUserMessage]);
                setIsTyping(true);

                setTimeout(() => {
                    setIsTyping(false);
                    const supportResponse = {
                        id: messages.length + 2,
                        sender: 'support',
                        text: 'Thank you for sharing the image! Our support team is reviewing it and will respond shortly.',
                        time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }),
                        avatar: 'https://golden88a.com/media/27c7b222e2a861a6d972e.gif'
                    };
                    setMessages(prev => [...prev, supportResponse]);
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '' && !selectedImage) return;

        const newUserMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputMessage || 'Sent an image',
            time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }),
            image: selectedImage
        };

        setMessages([...messages, newUserMessage]);
        setInputMessage('');
        setSelectedImage(null);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const supportResponse = {
                id: messages.length + 2,
                sender: 'support',
                text: 'Thank you for your message! A support agent will respond shortly. Average response time is under 2 minutes.',
                time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }),
                avatar: 'https://golden88a.com/media/27c7b222e2a861a6d972e.gif'
            };
            setMessages(prev => [...prev, supportResponse]);
        }, 1500);
    };

    const handleQuickReply = (reply) => {
        const newUserMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: reply.text,
            time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newUserMessage]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const supportResponse = {
                id: messages.length + 2,
                sender: 'support',
                text: autoResponses[reply.category],
                time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }),
                avatar: 'https://golden88a.com/media/27c7b222e2a861a6d972e.gif'
            };
            setMessages(prev => [...prev, supportResponse]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="middle-column chat-page-content">
            <div className="chat-header">
                <div className="chat-header-info">
                    <div className="chat-status-indicator">
                        <div className="status-dot"></div>
                        <span>Online</span>
                    </div>
                    <h2>Live Support Chat</h2>
                    <p>Average response time: &lt;2 minutes</p>
                </div>
                <div className="chat-header-actions">
                    <button className="chat-action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="chat-quick-replies">
                <h4>Quick Questions:</h4>
                <div className="quick-replies-grid">
                    {quickReplies.map(reply => (
                        <button key={reply.id} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
                            {reply.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chat-messages-container">
                {messages.map(message => (
                    <div key={message.id} className={`chat-message ${message.sender === 'user' ? 'user-message' : 'support-message'}`}>
                        {message.sender === 'support' && (
                            <div className="message-avatar">
                                <img src={message.avatar} alt="Support" />
                            </div>
                        )}
                        <div className="message-content">
                            <div className="message-bubble">
                                {message.image && (
                                    <div className="message-image">
                                        <img src={message.image} alt="Uploaded" />
                                    </div>
                                )}
                                <p>{message.text}</p>
                            </div>
                            <span className="message-time">{message.time}</span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="chat-message support-message">
                        <div className="message-avatar">
                            <img src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif" alt="Support" />
                        </div>
                        <div className="message-content">
                            <div className="message-bubble typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-container">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
                {selectedImage && (
                    <div className="image-preview">
                        <img src={selectedImage} alt="Preview" />
                        <button className="remove-image-btn" onClick={() => setSelectedImage(null)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                )}
                <div className="chat-input-wrapper">
                    <button className="chat-attach-btn" onClick={() => fileInputRef.current.click()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="chat-input"
                    />
                    <button className="chat-emoji-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </button>
                    <button className="chat-send-btn" onClick={handleSendMessage}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send
                    </button>
                </div>
                <div className="chat-info-text">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Your conversation is secure and encrypted
                </div>
            </div>

            <div className="chat-contact-methods">
                <h4>Other Contact Methods</h4>
                <div className="contact-methods-grid">
                    <div className="contact-method">
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </div>
                        <div className="contact-info">
                            <h5>Email Support</h5>
                            <p>support@golden88.com</p>
                            <span>Response within 24 hours</span>
                        </div>
                    </div>
                    <div className="contact-method">
                        <div className="contact-icon whatsapp">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </div>
                        <div className="contact-info">
                            <h5>WhatsApp</h5>
                            <p>+61 XXX XXX XXX</p>
                            <span>Available 24/7</span>
                        </div>
                    </div>
                    <div className="contact-method">
                        <div className="contact-icon telegram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                            </svg>
                        </div>
                        <div className="contact-info">
                            <h5>Telegram</h5>
                            <p>@Golden88Support</p>
                            <span>Instant messaging</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlaceholderPage = ({ title }) => (<div className="placeholder-page"><h1>{title}</h1><p>This page is currently under construction. Please check back later!</p></div>);

// --- Main App ---
function App() {
    const [isSideNavOpen, setSideNavOpen] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);

    // Check localStorage for existing login session on mount
    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        const storedBalance = localStorage.getItem('balance');

        if (storedLogin === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setBalance(parseFloat(storedBalance) || 0);
        }
    }, []);

    const handleLogin = (user, bal) => {
        setIsLoggedIn(true);
        setUsername(user);
        setBalance(bal);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setBalance(0);
        setSideNavOpen(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('balance');
    };

    const handleGameClick = (game) => { setSelectedGame(game); };
    const handleCloseModal = () => { setSelectedGame(null); };

    const renderPage = () => {
        switch (activePage) {
            case 'home': return <HomePage onGameClick={handleGameClick} />;
            case 'login': return <LoginPage onLogin={handleLogin} />;
            case 'register': return <RegisterPage onLogin={handleLogin} />;
            case 'promo': return <PromoPage />;
            case 'chat': return <ChatPage />;
            case 'history': return <PlaceholderPage title="History" />;
            case 'settings': return <PlaceholderPage title="Settings" />;
            default: return <HomePage onGameClick={handleGameClick} />;
        }
    };

    return (
        <div className="app-container">
            <Header onOpenNav={() => setSideNavOpen(true)} isLoggedIn={isLoggedIn} balance={balance} onLogout={handleLogout} />
            <Marquee />
            <SideNav isOpen={isSideNavOpen} closeNav={() => setSideNavOpen(false)} onLogout={handleLogout} />
            <div id="content">
                <div id="home-container">
                    <div id="home" className={(activePage === 'promo' || activePage === 'chat' || activePage === 'login' || activePage === 'register') ? 'promo-full-width' : ''}>
                        {activePage !== 'promo' && activePage !== 'chat' && activePage !== 'login' && activePage !== 'register' && <LeftSidebar />}
                        {renderPage()}
                        {activePage !== 'promo' && activePage !== 'chat' && activePage !== 'login' && activePage !== 'register' && <RightSidebar isLoggedIn={isLoggedIn} username={username} balance={balance} onLogout={handleLogout} onLogin={handleLogin} setActivePage={setActivePage} />}
                    </div>
                </div>
            </div>
            <Footer activePage={activePage} setActivePage={setActivePage} />
            <GameDetailModal game={selectedGame} onClose={handleCloseModal} />
        </div>
    );
}

const Footer = ({ activePage, setActivePage }) => {
    const navItems = ['home', 'history', 'promo', 'chat', 'settings'];
    return (
        <div id="footer">
            {navItems.map(item => (<a key={item} id={`footer-${item}`} className={activePage === item ? 'selected' : ''} onClick={() => setActivePage(item)}></a>))}
        </div>
    );
};

export default App;
