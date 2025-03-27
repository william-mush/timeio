import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <motion.div
        animate={{
          x: checked ? 24 : 0,
        }}
        className="absolute left-0 w-6 h-6 bg-white rounded-full shadow-md"
      />
    </button>
  );
} 