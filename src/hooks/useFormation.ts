import { useState, useCallback } from 'react';
import { Player, TacticalArrow } from '../types';

const getPlayerColor = (position: string): string => {
  if (position === 'GK') return '#22c55e'; // Green
  if (['CB', 'LB', 'RB'].includes(position)) return '#eab308'; // Yellow
  if (['CM', 'DM', 'LW', 'RW'].includes(position)) return '#3b82f6'; // Blue
  if (['ST', 'CF'].includes(position)) return '#ef4444'; // Red
  return '#6b7280'; // Gray fallback
};

const getDefaultFormation = (): Player[] => [
  { id: '1', position: 'GK', name: 'Goalkeeper', x: 80, y: 250, color: getPlayerColor('GK') },
  { id: '2', position: 'CB', name: 'Center Back', x: 180, y: 180, color: getPlayerColor('CB') },
  { id: '3', position: 'CB', name: 'Center Back', x: 180, y: 320, color: getPlayerColor('CB') },
  { id: '4', position: 'LB', name: 'Left Back', x: 220, y: 400, color: getPlayerColor('LB') },
  { id: '5', position: 'RB', name: 'Right Back', x: 220, y: 100, color: getPlayerColor('RB') },
  { id: '6', position: 'DM', name: 'Defensive Mid', x: 320, y: 250, color: getPlayerColor('DM') },
  { id: '7', position: 'CM', name: 'Center Mid', x: 420, y: 200, color: getPlayerColor('CM') },
  { id: '8', position: 'CM', name: 'Center Mid', x: 420, y: 300, color: getPlayerColor('CM') },
  { id: '9', position: 'RW', name: 'Right Wing', x: 520, y: 120, color: getPlayerColor('RW') },
  { id: '10', position: 'LW', name: 'Left Wing', x: 520, y: 380, color: getPlayerColor('LW') },
  { id: '11', position: 'ST', name: 'Striker', x: 620, y: 250, color: getPlayerColor('ST') }
];

export const useFormation = () => {
  const [players, setPlayers] = useState<Player[]>(getDefaultFormation());
  const [arrows, setArrows] = useState<TacticalArrow[]>([]);

  const updatePlayerPosition = useCallback((playerId: string, x: number, y: number) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === playerId ? { ...player, x, y } : player
      )
    );
  }, []);

  const addArrow = useCallback((arrow: Omit<TacticalArrow, 'id'>) => {
    const newArrow: TacticalArrow = {
      ...arrow,
      id: Date.now().toString()
    };
    setArrows(prev => [...prev, newArrow]);
  }, []);

  const clearArrows = useCallback(() => {
    setArrows([]);
  }, []);

  const resetFormation = useCallback(() => {
    setPlayers(getDefaultFormation());
    setArrows([]);
  }, []);

  const saveFormation = useCallback(() => {
    const formation = {
      players,
      arrows,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('footballFormation', JSON.stringify(formation));
    alert('Formation saved successfully!');
  }, [players, arrows]);

  const loadFormation = useCallback(() => {
    const saved = localStorage.getItem('footballFormation');
    if (saved) {
      try {
        const formation = JSON.parse(saved);
        setPlayers(formation.players);
        setArrows(formation.arrows || []);
      } catch (error) {
        console.error('Failed to load formation:', error);
      }
    }
  }, []);

  return {
    players,
    arrows,
    updatePlayerPosition,
    addArrow,
    clearArrows,
    resetFormation,
    saveFormation,
    loadFormation
  };
};