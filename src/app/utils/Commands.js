import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyBuilding, changeCashPerClick, changeCashPerSecond, changeLevel, changeCash, reset } from '../store/index';

export default function CommandBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [command, setCommand] = useState('');

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '`') {
                setIsVisible(!isVisible);
            } else if (event.key === 'Enter') {
                const [cmd, ...args] = command.trim().split(' ');
                switch (cmd) {
                    case 'reset':
                        dispatch(reset());
                        break;
                    case 'cash':
                        const cash = Number(args[0]);
                        if (!isNaN(cash)) {
                            dispatch(changeCash(cash));
                        } else {
                            console.log('Invalid amount:', cash);
                        }
                        break;
                    case 'level':
                        const level = Number(args[0]);
                        dispatch(changeLevel(level));
                        break;
                    case 'buy':
                        const buildingName = args[0];
                        dispatch(buyBuilding(buildingName));
                        break;
                    case 'cashPerSecond':
                        const perSecond = args[0];
                        dispatch(changeCashPerSecond(Number(perSecond)));
                        break;
                    case 'cashPerClick':
                        const perClick = args[0];
                        dispatch(changeCashPerClick(Number(perClick)));
                        break;
                    case 'help':
                        console.log('Available commands: help, reset, cash <amount>, levelup, buy <buildingName>, cashPerSecond <amount>, cashPerClick <amount>');
                        break;
                    default:
                        console.log('Unknown command (use help command):', command);
                }
                setCommand('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [command, isVisible]);

    if (!isVisible) return null;

    return (
        <div style={styles.commandBar}>
            <button style={styles.closeButton} onClick={() => setIsVisible(!isVisible)}>
                ×
            </button>
            <input
                type="text"
                placeholder="Write your command here..."
                style={styles.input}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
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
