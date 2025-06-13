import { configureStore, createSlice } from '@reduxjs/toolkit';

const defaultBuildings = () => ({
    house_1: false,
    house_2: false,
    house_3: false,
    house_4: false,
    house_5: false,
    house_6: false,
    house_7: false,
    house_8: false,
    house_9: false,
    house_10: false,
});

const defaultBuildingUpgrades = () => ({
    house_1: { level: 1 },
    house_2: { level: 1 },
    house_3: { level: 1 },
    house_4: { level: 1 },
    house_5: { level: 1 },
    house_6: { level: 1 },
    house_7: { level: 1 },
    house_8: { level: 1 },
    house_9: { level: 1 },
    house_10: { level: 1 },
});

const defaultUpgrades = () => ({
    more_cash_per_click: { first: false, second: false, third: false },
    more_cash_per_second: { first: false, second: false, third: false },
    building_upgrades: defaultBuildingUpgrades(),
    end_game: false,
});

const initialState = {
    cash: 0,
    level: 'earth',
    levelNumber: 0,
    cashPerClick: 1,
    cashPerSecond: 0,
    cashPerSecondMultiplier: 1,
    status: '',
    bought: {
        buildings: defaultBuildings(),
    },
    upgrades: defaultUpgrades(),
};

const levelNames = ['earth', 'moon', 'mars'];

const cashPerClickBonuses = [3, 50, 100];
const cashPerSecondMultipliers = [1.3, 1.5, 2];
const buildingBasePerSecond = 100;
const levelOrder = ['first', 'second', 'third'];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.cash = 0;
            state.level = 'earth';
            state.levelNumber = 0;
            state.cashPerClick = 1;
            state.cashPerSecond = 0;
            state.cashPerSecondMultiplier = 1;
            state.status = '';
            state.bought.buildings = defaultBuildings();
            state.upgrades = defaultUpgrades();
        },
        resetBuildings: (state) => {
            state.bought.buildings = defaultBuildings();
            state.upgrades.building_upgrades = defaultBuildingUpgrades();
        },
        resetUpgrades: (state) => {
            state.upgrades = defaultUpgrades();
            state.cashPerSecondMultiplier = 1;
        },
        buyBuilding: (state, action) => {
            const buildingName = action.payload.houseName;
            const amount = action.payload.amount;

            if (state.cash >= amount) {
                if (state.bought.buildings[buildingName] !== undefined) {
                    state.bought.buildings[buildingName] = true;
                } else {
                    console.error(`Building "${buildingName}" does not exist.`);
                }
                state.status = `You bought ${buildingName}`;
                state.cash -= amount;
                state.cashPerSecond += buildingBasePerSecond;
            } else {
                state.status = `You don't have enough money to buy ${buildingName}`;
            }
        },
        changeCashPerClick: (state, action) => {
            state.cashPerClick = action.payload;
        },
        changeCashPerSecond: (state, action) => {
            state.cashPerSecond = action.payload;
        },
        changeCashPerSecondMultiplier: (state, action) => {
            state.cashPerSecondMultiplier = action.payload;
        },
        changeCash: (state, action) => {
            const amount = action.payload;
            if (typeof amount === 'number' && !isNaN(amount)) {
                state.cash += amount;
            } else {
                console.error('Invalid amount:', amount);
            }
        },
        changeLevel: (state, action) => {
            const idx = typeof action.payload === 'number' ? action.payload : 0;
            state.level = levelNames[idx] || 'earth';
            state.levelNumber = idx;
            state.cash = 0;
            state.cashPerClick = 1;
            state.cashPerSecond = 0;
            state.cashPerSecondMultiplier = 1;
            state.bought.buildings = defaultBuildings();

            state.upgrades = defaultUpgrades();
        },
        click: (state) => {
            state.cash += state.cashPerClick;
        },
        addMoneyPerSecond: (state) => {
            state.cash += state.cashPerSecond * state.cashPerSecondMultiplier;
        },
        buyUpgrade: (state, action) => {
            const { type, level } = action.payload;
            const idx = levelOrder.indexOf(level);
            if (
                state.upgrades[type] &&
                state.upgrades[type][level] === false &&
                (
                    idx === 0 ||
                    (idx > 0 && state.upgrades[type][levelOrder[idx - 1]] === true)
                )
            ) {
                state.upgrades[type][level] = true;
                if (type === "more_cash_per_click") {
                    if (idx !== -1) state.cashPerClick += cashPerClickBonuses[idx];
                }
                else if (type === "more_cash_per_second") {
                    if (idx !== -1) state.cashPerSecondMultiplier = cashPerSecondMultipliers[idx];
                }
            }
        },
        buyBuildingUpgrade: (state, action) => {
            const { house, nextLevel } = action.payload;
            if (
                state.bought.buildings[house] &&
                state.upgrades.building_upgrades[house] &&
                typeof nextLevel === 'number' &&
                nextLevel <= 3 &&
                state.upgrades.building_upgrades[house].level < 3
            ) {
                state.upgrades.building_upgrades[house].level = nextLevel;
                state.cashPerSecond += buildingBasePerSecond;
            }
        },
    },
});

export const {
    reset, resetBuildings, resetUpgrades,
    buyBuilding, changeCashPerClick,
    changeCash, changeCashPerSecond, changeCashPerSecondMultiplier, changeLevel,
    addMoneyPerSecond, click,
    buyUpgrade, buyBuildingUpgrade
} = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;