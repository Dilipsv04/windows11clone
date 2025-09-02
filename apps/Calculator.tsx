import React, { useState } from 'react';

const Button: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    span?: number;
}> = ({ onClick, children, className = '', span = 1 }) => (
    <button
        onClick={onClick}
        className={`bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg text-2xl transition-colors ${className}`}
        style={{ gridColumn: `span ${span}`}}
    >
        {children}
    </button>
);

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };
    
    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
        setCurrentValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };
    
    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const inputPercent = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (currentValue === null) {
            setCurrentValue(inputValue);
        } else if (operator) {
            const result = calculate(currentValue, inputValue, operator);
            setCurrentValue(result);
            setDisplay(String(result));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (firstOperand: number, secondOperand: number, op: string): number => {
        switch (op) {
            case '+': return firstOperand + secondOperand;
            case '-': return firstOperand - secondOperand;
            case '*': return firstOperand * secondOperand;
            case '/': return firstOperand / secondOperand;
            case '=': return secondOperand;
            default: return secondOperand;
        }
    };
    
    const handleEquals = () => {
        const inputValue = parseFloat(display);
        if (operator && currentValue !== null) {
            const result = calculate(currentValue, inputValue, operator);
            setDisplay(String(result));
            setCurrentValue(result);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };
    

    return (
        <div className="h-full w-full flex flex-col bg-[#202020] text-white p-2 max-w-sm mx-auto">
            <div className="flex-grow flex items-end justify-end p-4 bg-transparent">
                <h1 className="text-6xl font-light break-all">{display}</h1>
            </div>
            <div className="grid grid-cols-4 gap-2 h-3/4">
                <Button onClick={clearDisplay} className="bg-gray-500 hover:bg-gray-400">AC</Button>
                <Button onClick={toggleSign} className="bg-gray-500 hover:bg-gray-400">+/-</Button>
                <Button onClick={inputPercent} className="bg-gray-500 hover:bg-gray-400">%</Button>
                <Button onClick={() => performOperation('/')} className="bg-orange-500 hover:bg-orange-400 text-white">÷</Button>
                
                <Button onClick={() => inputDigit('7')}>7</Button>
                <Button onClick={() => inputDigit('8')}>8</Button>
                <Button onClick={() => inputDigit('9')}>9</Button>
                <Button onClick={() => performOperation('*')} className="bg-orange-500 hover:bg-orange-400 text-white">×</Button>

                <Button onClick={() => inputDigit('4')}>4</Button>
                <Button onClick={() => inputDigit('5')}>5</Button>
                <Button onClick={() => inputDigit('6')}>6</Button>
                <Button onClick={() => performOperation('-')} className="bg-orange-500 hover:bg-orange-400 text-white">-</Button>

                <Button onClick={() => inputDigit('1')}>1</Button>
                <Button onClick={() => inputDigit('2')}>2</Button>
                <Button onClick={() => inputDigit('3')}>3</Button>
                <Button onClick={() => performOperation('+')} className="bg-orange-500 hover:bg-orange-400 text-white">+</Button>
                
                <Button onClick={() => inputDigit('0')} span={2}>0</Button>
                <Button onClick={inputDecimal}>.</Button>
                <Button onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white">=</Button>
            </div>
        </div>
    );
};

export default Calculator;
