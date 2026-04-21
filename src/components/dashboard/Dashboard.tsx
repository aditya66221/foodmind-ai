import React from 'react';
import { CravingGauge } from './CravingGauge';
import { InputControls } from './InputControls';
import { SplitReality } from './SplitReality';
import { WorkflowVisualizer } from './WorkflowVisualizer';

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-6 pb-24">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-16 pt-8">
        <CravingGauge />
        <InputControls />
      </div>

      {/* Split Reality */}
      <div className="mt-24 mb-16">
        <SplitReality />
      </div>

      {/* Workflow Visualizer */}
      <div className="mt-16">
        <WorkflowVisualizer />
      </div>
    </div>
  );
};
