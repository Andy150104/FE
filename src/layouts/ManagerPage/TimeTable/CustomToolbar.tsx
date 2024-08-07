import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';
import moment from 'moment';

const CustomToolbar: React.FC<ToolbarProps> = ({ localizer: { messages }, label, date, onNavigate, onView }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToView = (view: View) => {
    onView(view);
  };
  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button type="button" onClick={goToBack}>Back</button>
        <button type="button" onClick={goToToday}>Today</button>
        <button type="button" onClick={goToNext}>Next</button>
      </div>
      <div className="rbc-toolbar-center">
        <span className="rbc-toolbar-label">{label}</span>
      </div>
      <div className="rbc-btn-group">
        <button type="button" onClick={() => goToView('month')}>Month</button>
        <button type="button" onClick={() => goToView('week')}>Week</button>
        <button type="button" onClick={() => goToView('day')}>Day</button>
        <button type="button" onClick={() => goToView('agenda')}>Agenda</button>
      </div>
    </div>
  );
};

export default CustomToolbar;
