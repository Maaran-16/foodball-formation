import React, { useState, useEffect } from 'react';
import FootballPitch from './components/FootballPitch';
import ControlPanel from './components/ControlPanel';
import { useFormation } from './hooks/useFormation';
import { exportToPNG } from './utils/exportUtils';

function App() {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const {
    players,
    arrows,
    updatePlayerPosition,
    addArrow,
    clearArrows,
    resetFormation,
    saveFormation,
    loadFormation
  } = useFormation();

  useEffect(() => {
    loadFormation();
  }, [loadFormation]);

  const handleToggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  const handleExportPNG = () => {
    exportToPNG('football-pitch-container', 'football-formation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Football Formation Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Create and visualize tactical formations with drag-and-drop players and tactical arrows
          </p>
        </div>

        <ControlPanel
          isDrawingMode={isDrawingMode}
          onToggleDrawingMode={handleToggleDrawingMode}
          onClearArrows={clearArrows}
          onSaveFormation={saveFormation}
          onExportPNG={handleExportPNG}
          onResetFormation={resetFormation}
        />

        <div id="football-pitch-container" className="bg-transparent">
          <FootballPitch
            players={players}
            arrows={arrows}
            onPlayerDrag={updatePlayerPosition}
            onArrowCreate={addArrow}
            isDrawingMode={isDrawingMode}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with React and TypeScript • 
            Drag players to reposition • 
            Click Draw mode to add tactical arrows • 
            Export as PNG for sharing
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;