import {
  Card,
  createEmptyCard,
  FSRS,
  GenSeedStrategyWithCardId,
  generatorParameters,
  RecordLogItem,
  StrategyMode,
  Grade,
} from "ts-fsrs";

type WithNodeId<T> = T & { id: string };

const resolved = generatorParameters({ enable_fuzz: true });
const scheduler = new FSRS(resolved);
scheduler.useStrategy(StrategyMode.SEED, GenSeedStrategyWithCardId("id"));

function createCardForNode(text: string) {
  const card = createEmptyCard(new Date(), function (card) {
    return {
      ...card,
      id: text,
    } as WithNodeId<Card>;
  });
  return card;
}

// function previewRatings(card: Card, now = new Date()) {
//   const result: RecordLog = scheduler.repeat(card, now);
//   return result;
// }

function nextState(card: Card, rating: Grade, now = new Date()) {
  const result: RecordLogItem = scheduler.next(card, now, rating);
  return result;
}

// function scheduleCard(card: Card, rating: Grade, now = new Date()) {
//   const next = nextState(card, rating, now);
//   return next.card;
// }

export { createCardForNode, nextState };
