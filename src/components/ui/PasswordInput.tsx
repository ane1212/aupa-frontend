import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';

interface PasswordInputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    testId?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    value,
    onChange,
    testId
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="password-container">
            <div className='input-wrapper'>
                <LockKeyhole className="icon" size={21} color="currentColor" />
                <input
                    data-testid={testId}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="input-box"
                    autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-icon" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? (<Eye size={21} color="currentColor" />) : (<EyeOff size={21} color="currentColor" />)}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;