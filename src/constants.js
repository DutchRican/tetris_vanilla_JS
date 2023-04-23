const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const preview = document.getElementById('preview');
const preview_ctx = preview.getContext('2d');

const scoreOut = document.getElementById('score');
preview.width = 100;
preview.height = 100;

const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 600;

const BLOCK_SIZE = 30;
const PREVIEW_BLOCK_SIZE = 20;
const ROW_COUNT = 10;
const COL_COUNT = 20;

const COLORS = ['green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown'];
