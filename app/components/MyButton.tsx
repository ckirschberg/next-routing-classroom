type ButtonProps = {
    label: string;
    onClick: () => void;
}

export function MyButton({ label, onClick }: ButtonProps) {
    return <button onClick={onClick} style={{border: "1px black solid", cursor: "pointer", backgroundColor:"blue"}}>{label}</button>;
}