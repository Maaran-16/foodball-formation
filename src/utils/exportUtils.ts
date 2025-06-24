import html2canvas from 'html2canvas';

export const exportToPNG = async (elementId: string, filename: string = 'football-formation') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for export');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#22c55e',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const link = document.createElement('a');
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to export formation:', error);
    alert('Failed to export formation. Please try again.');
  }
};