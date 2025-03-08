import { create_chessboard } from './chessboard.js';
import { setupInitialPosition } from './pieces.js';
import { dragstartHandler } from './game.js';


create_chessboard();
setupInitialPosition();
dragstartHandler();