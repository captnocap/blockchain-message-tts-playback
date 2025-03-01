let queue: string[] = [];

export function addToQueue(audioPath: string) {
  queue.push(audioPath);
  console.log(`Queue updated: ${queue.length} items`);
}

export function getNextAudio(): string | undefined {
  return queue.shift();
}
