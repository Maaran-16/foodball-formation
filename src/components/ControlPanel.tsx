import React from 'react';
import { Download, Pen, Move, RotateCcw, Save } from 'lucide-react';

interface ControlPanelProps {
  isDrawingMode: boolean;
  onToggleDrawingMode: () => void;
  onClearArrows: () => void;
  onSaveFormation: () => void;
  onExportPNG: () => void;
  onResetFormation: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isDrawingMode,
  onToggleDrawingMode,
  onClearArrows,
  onSaveFormation,
  onExportPNG,
  onResetFormation
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Formation Builder</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={onToggleDrawingMode}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isDrawingMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isDrawingMode ? <Move size={16} /> : <Pen size={16} />}
          {isDrawingMode ? 'Move' : 'Draw'}
        </button>

        <button
          onClick={onClearArrows}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          <RotateCcw size={16} />
          Clear Arrows
        </button>

        <button
          onClick={onSaveFormation}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <Save size={16} />
          Save
        </button>

        <button
          onClick={onExportPNG}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
        >
          <Download size={16} />
          Export PNG
        </button>

        <button
          onClick={onResetFormation}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-1">
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click "Draw" to enter drawing mode and click to create tactical arrows</li>
          <li>Click "Move" to drag players around the pitch</li>
          <li>Use "Export PNG" to download your formation as an image</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;