import React from 'react';

// Exported from redux-devtools
import { createDevTools } from '@redux-devtools/core';
// Monitors are separate packages, and you can make a custom one
import {LogMonitor} from '@redux-devtools/log-monitor';
import {DockMonitor} from '@redux-devtools/dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={true}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,);

export default DevTools;