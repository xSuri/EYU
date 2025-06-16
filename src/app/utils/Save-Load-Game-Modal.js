import { useState } from 'react';

export default function SaveLoadModal({ isOpen, onClose, onSave, onLoad, saveString }) {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "#222",
                color: "#fff",
                borderRadius: 12,
                padding: 32,
                minWidth: 340,
                maxWidth: "90vw",
                boxShadow: "0 6px 32px #000a",
                position: "relative"
            }}>
                <button 
                    style={{
                        position: "absolute",
                        right: 16, top: 12,
                        background: "none",
                        color: "#fff",
                        border: "none",
                        fontSize: 24,
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                    aria-label="Zamknij"
                >×</button>
                <h2 style={{marginBottom: 18, fontSize: 22}}>Zapis i wczytywanie gry</h2>
                
                <div style={{marginBottom: 22}}>
                    <div style={{fontSize: 15, marginBottom: 8, fontWeight: 600}}>Twój obecny zapis (base64):</div>
                    <textarea
                        readOnly
                        value={saveString || ""}
                        style={{
                            width: "100%",
                            minHeight: 64,
                            fontSize: 13,
                            borderRadius: 6,
                            padding: 8,
                            resize: "vertical",
                            background: "#181818",
                            color: "#fff",
                            border: "1px solid #444"
                        }}
                    />
                    <button
                        style={{
                            marginTop: 6,
                            padding: "6px 12px",
                            fontSize: 14,
                            borderRadius: 6,
                            cursor: "pointer",
                            background: "#3e63dd",
                            color: "#fff",
                            border: "none"
                        }}
                        onClick={() => {
                            if (saveString) {
                                navigator.clipboard.writeText(saveString);
                            }
                        }}
                        disabled={!saveString}
                    >Kopiuj do schowka</button>
                </div>

                <div style={{margin: "28px 0 16px"}}>
                    <div style={{fontSize: 15, marginBottom: 8, fontWeight: 600}}>Wklej zapis (base64), aby wczytać grę:</div>
                    <textarea
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        style={{
                            width: "100%",
                            minHeight: 64,
                            fontSize: 13,
                            borderRadius: 6,
                            padding: 8,
                            resize: "vertical",
                            background: "#181818",
                            color: "#fff",
                            border: "1px solid #444"
                        }}
                        placeholder="Wklej tutaj zapis gry (base64)..."
                    />
                    <button
                        style={{
                            marginTop: 6,
                            padding: "6px 12px",
                            fontSize: 14,
                            borderRadius: 6,
                            cursor: "pointer",
                            background: "#10b981",
                            color: "#fff",
                            border: "none"
                        }}
                        onClick={() => {
                            if (inputValue && typeof onLoad === 'function') {
                                onLoad(inputValue);
                                setInputValue('');
                            }
                        }}
                        disabled={!inputValue}
                    >Wczytaj zapis</button>
                </div>
            </div>
        </div>
    );
}