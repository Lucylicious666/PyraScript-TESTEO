// src/components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletBalance, getRecentProjects, getHackerActivity } from '../services/wyrty';
import { auth, subscribeToNotifications } from '../services/auth';
import HackerChart from './HackerChart';
import NotificationBell from './NotificationBell';
import terminalSound from '../assets/sounds/terminal.mp3';
import '../assets/css/style.css';

const Dashboard = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [balance, setBalance] = useState(0);
  const [projects, setProjects] = useState([]);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener datos del usuario
        const user = await auth.getUser();
        setUserData(user);

        // 2. Obtener balance y proyectos
        const [wyrtyBalance, recentProjects, activity] = await Promise.all([
          getWalletBalance(user.id),
          getRecentProjects(user.id),
          getHackerActivity(user.id)
        ]);
        
        setBalance(wyrtyBalance);
        setProjects(recentProjects);
        setActivityData(activity);

        // 3. Simular terminal hacker
        simulateTerminal();

        // 4. Configurar notificaciones en tiempo real
        subscribeToNotifications((newNotification) => {
          setNotifications(prev => [newNotification, ...prev]);
          playSound();
        });

      } catch (error) {
        console.error('Error loading dashboard:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const simulateTerminal = () => {
    const messages = [
      '> Iniciando sistema PyraScript v3.1.4...',
      '> Verificando módulos de seguridad... OK',
      '> Cargando datos encriptados... OK',
      '> Conexión establecida con nodo principal',
      '> Bienvenido, ' + userData.username
    ];
    
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, msg]);
      }, i * 800);
    });
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  // Efecto para responsive design
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={`dashboard-container ${isMobile ? 'mobile-view' : ''}`}>
      {/* Audio para efectos de sonido */}
      <audio ref={audioRef} src={terminalSound} preload="auto" />
      
      {/* Header con notificaciones */}
      <div className="terminal-header">
        <div className="header-left">
          <h1>PYRASCRIPT_DASHBOARD</h1>
          <div className="user-tag">@{userData.username}</div>
        </div>
        <div className="header-right">
          <NotificationBell 
            count={notifications.length} 
            items={notifications}
            onClear={() => setNotifications([])}
          />
          <button onClick={handleLogout} className="hacker-btn glow-red">
            [CERRAR_SESION]
          </button>
        </div>
      </div>

      {/* Sección principal */}
      <div className="dashboard-grid">
        {/* Columna izquierda - Terminal y Wallet */}
        <div className="left-column">
          <div className="terminal-box scanlines">
            {terminalOutput.map((line, index) => (
              <p key={index} className="terminal-line">{line}</p>
            ))}
            <p className="terminal-line blinking-cursor">_</p>
          </div>

          <div className="wallet-card hacker-card">
            <h2>WYRTY WALLET</h2>
            <div className="balance-display">
              <span className="currency-symbol">⏣</span>
              <span className="balance-amount">{balance}</span>
              <span className="currency-code">WYR</span>
            </div>
            <div className="wallet-actions">
              <button className="hacker-btn small" onClick={() => navigate('/wallet/send')}>
                ENVIAR
              </button>
              <button className="hacker-btn small" onClick={() => navigate('/wallet/receive')}>
                RECIBIR
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha - Gráficos y Proyectos */}
        <div className="right-column">
          <div className="hacker-card activity-card">
            <h2>ACTIVIDAD HACKER</h2>
            <HackerChart data={activityData} />
            <div className="activity-stats">
              <div className="stat">
                <span className="stat-label">PENTESTS</span>
                <span className="stat-value">{activityData.reduce((acc, curr) => acc + curr.pentests, 0)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">WYRTY GANADOS</span>
                <span className="stat-value">+{activityData.reduce((acc, curr) => acc + curr.rewards, 0)}</span>
              </div>
            </div>
          </div>

          <div className="projects-section hacker-card">
            <h2>PROYECTOS_ACTIVOS</h2>
            <div className="project-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
                  <div className="project-status-indicator" data-status={project.status} />
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-reward">
                    <span className="reward-amount">{project.reward}</span>
                    <span className="reward-currency">WYR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Efectos especiales */}
      <div className="hacker-effects">
        <div className="glitch-overlay"></div>
        <div className="scanline"></div>
      </div>
    </div>
  );
};

export default Dashboard;