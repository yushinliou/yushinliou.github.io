import { createNoise2D } from 'simplex-noise';

interface Node {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  breatheOffset: number;
  isYou?: boolean;
}

interface Edge {
  source: number;
  target: number;
  controlOffset: number;
  noiseOffset: number;
}

interface ColorScheme {
  bgGradientInner: string;
  bgGradientOuter: string;
  nodeColor: string;
  nodeOpacityRange: [number, number];
  edgeAlpha: number;
  youNodeColor: string;
}

const colorSchemes: Record<'dark' | 'light', ColorScheme> = {
  dark: {
    bgGradientInner: '#12121a',
    bgGradientOuter: '#0a0a0f',
    nodeColor: '#4a4a52',
    nodeOpacityRange: [0.4, 0.7],
    edgeAlpha: 0.15,
    youNodeColor: '#ba3a3a',
  },
  light: {
    bgGradientInner: '#f5f5f7',
    bgGradientOuter: '#e8e8ea',
    nodeColor: '#888888',
    nodeOpacityRange: [0.6, 0.8],
    edgeAlpha: 0.25,
    youNodeColor: '#ba3a3a',
  }
};

export function createNetwork(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const noise2D = createNoise2D();

  let width = 0;
  let height = 0;
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let youNode: Node | null = null;
  let cursorX = 0;
  let cursorY = 0;
  let prevCursorX = 0;
  let prevCursorY = 0;
  let cursorVelX = 0;
  let cursorVelY = 0;
  let cursorInCanvas = false;
  let time = 0;
  let currentTheme: 'dark' | 'light' = 'dark';

  // Theme detection
  const getTheme = (): 'dark' | 'light' => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  };

  // Update current theme
  currentTheme = getTheme();

  // Watch for theme changes
  const themeObserver = new MutationObserver(() => {
    currentTheme = getTheme();
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // Calculate temporal nodes count (April 2001 to current)
  const calculateNodeCount = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-indexed to 1-indexed
    const startYear = 2001;
    const startMonth = 4;

    return (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
  };

  const nodeCount = calculateNodeCount();

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    initializeNodes();
  };

  const initializeNodes = () => {
    nodes = [];

    // Create temporal nodes in organic cluster layout
    for (let i = 0; i < nodeCount; i++) {
      // Use Fibonacci spiral for natural distribution
      const angle = i * 2.399963229728653; // golden angle in radians
      const radius = Math.sqrt(i) * 28; // Increased from 18 to 28 for wider spread

      const centerX = width / 2;
      const centerY = height / 2;

      // Increased randomness to spread nodes more organically
      const jitterX = (Math.random() - 0.5) * 60;
      const jitterY = (Math.random() - 0.5) * 60;

      const x = centerX + Math.cos(angle) * radius + jitterX;
      const y = centerY + Math.sin(angle) * radius + jitterY;

      const colors = colorSchemes[currentTheme];
      const [minOpacity, maxOpacity] = colors.nodeOpacityRange;

      nodes.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        radius: 3 + Math.random() * 2,
        opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
        breatheOffset: Math.random() * Math.PI * 2,
      });
    }

    calculateEdges();
  };

  const calculateEdges = () => {
    edges = [];

    // Connect each node to 1-3 nearest neighbors
    for (const node of nodes) {
      const distances: Array<{ nodeIndex: number; distance: number }> = [];

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === node.id) continue;

        const dx = nodes[i].x - node.x;
        const dy = nodes[i].y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        distances.push({ nodeIndex: i, distance });
      }

      // Sort by distance and take 0-2 nearest (reduced connections)
      distances.sort((a, b) => a.distance - b.distance);
      const connectionCount = Math.floor(Math.random() * 3); // 0, 1, or 2 connections

      for (let i = 0; i < connectionCount && i < distances.length; i++) {
        const targetIndex = distances[i].nodeIndex;

        // Avoid duplicate edges
        const alreadyExists = edges.some(
          e => (e.source === node.id && e.target === nodes[targetIndex].id) ||
               (e.source === nodes[targetIndex].id && e.target === node.id)
        );

        if (!alreadyExists) {
          edges.push({
            source: node.id,
            target: nodes[targetIndex].id,
            controlOffset: 15 + Math.random() * 15,
            noiseOffset: Math.random() * 1000,
          });
        }
      }
    }
  };

  const applyPerlinDrift = (node: Node, t: number) => {
    const noiseScale = 0.001;
    const noiseSpeed = 0.00025; // Reduced from 0.0005 for slower, more meditative movement

    const noiseX = noise2D(node.baseX * noiseScale, t * noiseSpeed + node.id);
    const noiseY = noise2D(node.baseY * noiseScale + 100, t * noiseSpeed + node.id);

    node.vx += noiseX * 0.12; // Reduced from 0.3 for slower drift
    node.vy += noiseY * 0.12; // Reduced from 0.3 for slower drift
  };

  const applyCursorForce = (node: Node, cx: number, cy: number, cvx: number, cvy: number) => {
    const dx = node.x - cx;
    const dy = node.y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceRadius = 80; // Reduced from 150 to 80 for smaller interaction area

    if (distance < forceRadius && distance > 0) {
      // Repulsion force with exponential falloff
      const strength = Math.exp(-distance / 50) * 2;
      const force = strength * (1 + Math.abs(cvx) + Math.abs(cvy)) * 0.5;

      node.vx += (dx / distance) * force;
      node.vy += (dy / distance) * force;
    }
  };

  const applySpringReturn = (node: Node) => {
    const k = 0.001; // very weak spring constant
    const dx = node.baseX - node.x;
    const dy = node.baseY - node.y;

    node.vx += dx * k;
    node.vy += dy * k;
  };

  const applyDamping = (node: Node) => {
    const damping = 0.96;
    node.vx *= damping;
    node.vy *= damping;
  };

  const updateNode = (node: Node, t: number) => {
    if (node.isYou) {
      // "You" node follows cursor with lerp
      const lerpFactor = 0.08;
      node.x += (cursorX - node.x) * lerpFactor;
      node.y += (cursorY - node.y) * lerpFactor;
    } else {
      // Apply physics to temporal nodes
      applyPerlinDrift(node, t);

      if (cursorInCanvas) {
        applyCursorForce(node, cursorX, cursorY, cursorVelX, cursorVelY);
      }

      applySpringReturn(node);
      applyDamping(node);

      // Update position
      node.x += node.vx;
      node.y += node.vy;
    }
  };

  const drawNode = (node: Node, t: number) => {
    const breathe = Math.sin(t * 0.001 + node.breatheOffset) * 0.05 + 1;
    const radius = node.radius * breathe;
    const colors = colorSchemes[currentTheme];

    if (node.isYou) {
      // "You" node with glow
      const pulse = Math.sin(t * 0.003) * 0.2 + 1;
      const glowRadius = radius * pulse * 3;

      // Outer glow
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
      gradient.addColorStop(0, 'rgba(232, 93, 93, 0.4)');
      gradient.addColorStop(0.5, 'rgba(232, 93, 93, 0.1)');
      gradient.addColorStop(1, 'rgba(232, 93, 93, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = colors.youNodeColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * pulse, 0, Math.PI * 2);
      ctx.fill();

      // "You" label
      ctx.save();
      ctx.font = '14px "SF Mono", "Monaco", "Consolas", "Courier New", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const labelX = node.x + 15;
      const labelY = node.y - 10;

      // Text background for readability with rounded corners
      const textMetrics = ctx.measureText('YOU');
      const bgPadding = 4;
      const borderRadius = 4;
      ctx.fillStyle = currentTheme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.roundRect(
        labelX - bgPadding,
        labelY - 10,
        textMetrics.width + bgPadding * 2,
        20,
        borderRadius
      );
      ctx.fill();

      // Draw text
      ctx.fillStyle = colors.youNodeColor;
      ctx.fillText('YOU', labelX, labelY);
      ctx.restore();
    } else {
      // Temporal node - convert hex to rgba
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 74, g: 74, b: 82 };
      };

      const rgb = hexToRgb(colors.nodeColor);
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${node.opacity})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawEdge = (edge: Edge, t: number) => {
    const sourceNode = nodes[edge.source];
    const targetNode = nodes[edge.target];

    if (!sourceNode || !targetNode) return;

    // Calculate midpoint
    const midX = (sourceNode.x + targetNode.x) / 2;
    const midY = (sourceNode.y + targetNode.y) / 2;

    // Calculate perpendicular direction
    const dx = targetNode.x - sourceNode.x;
    const dy = targetNode.y - sourceNode.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return;

    const perpX = -dy / length;
    const perpY = dx / length;

    // Animate control point offset with noise
    const noiseDrift = noise2D(edge.noiseOffset, t * 0.0003) * edge.controlOffset;

    const controlX = midX + perpX * noiseDrift;
    const controlY = midY + perpY * noiseDrift;

    // Determine if edge connects to "You" node
    const connectsToYou = (youNode && (edge.source === youNode.id || edge.target === youNode.id));
    const colors = colorSchemes[currentTheme];

    if (connectsToYou) {
      ctx.strokeStyle = 'rgba(232, 93, 93, 0.3)';
      ctx.lineWidth = 1;
    } else {
      // Convert hex to rgba for edges
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 74, g: 74, b: 82 };
      };

      const rgb = hexToRgb(colors.nodeColor);
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${colors.edgeAlpha})`;
      ctx.lineWidth = 1;
    }

    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.quadraticCurveTo(controlX, controlY, targetNode.x, targetNode.y);
    ctx.stroke();
  };

  const animate = () => {
    time += 1;

    // Clear canvas with gradient background (theme-aware)
    const colors = colorSchemes[currentTheme];
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
    gradient.addColorStop(0, colors.bgGradientInner);
    gradient.addColorStop(1, colors.bgGradientOuter);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Update cursor velocity
    cursorVelX = cursorX - prevCursorX;
    cursorVelY = cursorY - prevCursorY;
    prevCursorX = cursorX;
    prevCursorY = cursorY;

    // Update temporal nodes
    for (const node of nodes) {
      updateNode(node, time);
    }

    // Update "You" node
    if (youNode) {
      updateNode(youNode, time);
    }

    // Draw edges first (background)
    for (const edge of edges) {
      drawEdge(edge, time);
    }

    // Draw nodes
    for (const node of nodes) {
      drawNode(node, time);
    }

    // Draw "You" node on top
    if (youNode) {
      drawNode(youNode, time);
    }

    requestAnimationFrame(animate);
  };

  // Mouse events
  canvas.addEventListener('mouseenter', (e) => {
    cursorInCanvas = true;
    const rect = canvas.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;

    // Create "You" node
    youNode = {
      id: nodes.length,
      x: cursorX,
      y: cursorY,
      baseX: cursorX,
      baseY: cursorY,
      vx: 0,
      vy: 0,
      radius: 8,
      opacity: 1,
      breatheOffset: 0,
      isYou: true,
    };
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    cursorInCanvas = false;
    youNode = null;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    clearTimeout((window as any).resizeTimeout);
    (window as any).resizeTimeout = setTimeout(resize, 250);
  });

  // Initialize
  resize();
  animate();
}
