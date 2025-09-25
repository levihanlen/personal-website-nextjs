import {
  Card,
  createEmptyCard,
  FSRS,
  GenSeedStrategyWithCardId,
  generatorParameters,
  RecordLog,
  RecordLogItem,
  StrategyMode,
  Grade,
} from "ts-fsrs";
import { NodeClusterType } from "../knowledge/NEW";
import { getAnkiId } from "./text";

type WithNodeId<T> = T & { id: string };

function createScheduler(
  params?: Partial<Parameters<typeof generatorParameters>[0]>
) {
  const resolved = generatorParameters(params ?? {});
  const scheduler = new FSRS(resolved);
  scheduler.useStrategy(StrategyMode.SEED, GenSeedStrategyWithCardId("id"));
  return scheduler;
}

const schedulerCache = createScheduler({ enable_fuzz: true });

function getScheduler() {
  return schedulerCache;
}

function createCardForNode(node: NodeClusterType) {
  const card = createEmptyCard(new Date(), function (card) {
    return {
      ...card,
      id: getAnkiId(node),
    } as WithNodeId<Card>;
  });
  return card;
}

function previewRatings(card: Card, now = new Date()) {
  const scheduler = getScheduler();
  const result: RecordLog = scheduler.repeat(card, now);
  return result;
}

function nextState(card: Card, rating: Grade, now = new Date()) {
  const scheduler = getScheduler();
  const result: RecordLogItem = scheduler.next(card, now, rating);
  return result;
}

function scheduleCard(card: Card, rating: Grade, now = new Date()) {
  const next = nextState(card, rating, now);
  return next.card;
}

export {
  createCardForNode,
  createScheduler,
  getScheduler,
  nextState,
  previewRatings,
  scheduleCard,
};
