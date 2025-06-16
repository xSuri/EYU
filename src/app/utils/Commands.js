import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    buyBuilding, changeCashPerClick, changeCashPerSecond,
    changeLevel, changeCash, reset, resetBuildings, resetUpgrades,
    addMoneyPerSecond, buyUpgrade, buyBuildingUpgrade
} from '../store/index';

export default function CommandBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [command, setCommand] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '`') {
                setIsVisible((v) => !v);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleCommand = (cmdString) => {
        const [cmd, ...args] = cmdString.split(' ');
        switch (cmd) {
            case 'reset':
                dispatch(reset());
                break;
            case 'resetBuildings':
                dispatch(resetBuildings());
                break;
            case 'resetUpgrades':
                dispatch(resetUpgrades());
                break;
            case 'cash':
                {
                    const cash = Number(args[0]);
                    if (!isNaN(cash)) {
                        dispatch(changeCash(cash));
                    } else {
                        console.log('Invalid amount:', args[0]);
                    }
                }
                break;
            case 'cashPerClick':
                {
                    const val = Number(args[0]);
                    if (!isNaN(val)) {
                        dispatch(changeCashPerClick(val));
                    }
                }
                break;
            case 'cashPerSecond':
                {
                    const val = Number(args[0]);
                    if (!isNaN(val)) {
                        dispatch(changeCashPerSecond(val));
                    }
                }
                break;
            case 'addMoneyPerSecond':
                dispatch(addMoneyPerSecond());
                break;
            case 'level':
                {
                    const lvl = Number(args[0]);
                    if (!isNaN(lvl)) {
                        dispatch(changeLevel(lvl));
                    } else {
                        console.log('Provide level index (0-earth, 1-moon, 2-mars)');
                    }
                }
                break;
            case 'buy':
                {
                    const buildingName = args[0];
                    const amount = Number(args[1]);
                    if (buildingName && !isNaN(amount)) {
                        dispatch(buyBuilding({ houseName: buildingName, amount }));
                    } else {
                        console.log("Usage: buy <buildingName> <amount>");
                    }
                }
                break;
            case 'buyUpgrade':
                {
                    const type = args[0];
                    const level = args[1];
                    if (type && level) {
                        dispatch(buyUpgrade({ type, level }));
                    } else {
                        console.log('Usage: buyUpgrade <type> <level>');
                    }
                }
                break;
            case 'buyBuildingUpgrade':
                {
                    const house = args[0];
                    const nextLevel = Number(args[1]);
                    if (house && !isNaN(nextLevel)) {
                        dispatch(buyBuildingUpgrade({ house, nextLevel }));
                    } else {
                        console.log('Usage: buyBuildingUpgrade <house> <level>');
                    }
                }
                break;
            case 'help':
                console.log(
                    `Dostępne komendy:
help                 - pokazuje tą listę
reset                - resetuje cały postęp
resetBuildings       - resetuje budynki
resetUpgrades        - resetuje ulepszenia
cash <liczba>        - dodaje gotówkę (np. cash 10000)
cashPerClick <liczba>    - ustawia cashPerClick
cashPerSecond <liczba>   - ustawia cashPerSecond
addMoneyPerSecond    - natychmiast dodaje cashPerSecond
level <idx>          - zmienia poziom (0-ziemia, 1-księżyc, 2-mars)
buy <budynek> <kwota>    - kupuje budynek (np. buy house_1 1000)
buyUpgrade <typ> <poziom>      - ulepsza (np. buyUpgrade more_cash_per_click first)
buyBuildingUpgrade <budynek> <poziom> - ulepsza budynek (np. buyBuildingUpgrade house_1 2)
`);
                break;
            default:
                if (cmd.length > 0)
                    console.log('Nieznana komenda (użyj help):', cmdString);
        }
    };

    if (!isVisible) return null;

    return (
        <div style={styles.commandBar}>
            <button style={styles.closeButton} onClick={() => setIsVisible(false)}>
                ×
            </button>
            <input
                autoFocus
                type="text"
                placeholder="Write your command here..."
                style={styles.input}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleCommand(command.trim());
                        setCommand('');
                        e.preventDefault();
                    }
                }}
            />
        </div>
    );
};

const styles = {
    commandBar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#222',
        color: '#fff',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.3)',
        zIndex: 2000,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '20px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #555',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: '#fff',
    },
};