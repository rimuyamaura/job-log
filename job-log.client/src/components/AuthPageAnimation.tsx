import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 0 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

interface AuthPageAnimationProps {
  style?: React.CSSProperties;
}

const AuthPageAnimation = ({ style }: AuthPageAnimationProps) => {
  return (
    <div style={style}>
      <motion.svg
        width='100%'
        height='100%'
        viewBox='0 0 600 800'
        initial='hidden'
        animate='visible'
      >
        <motion.circle
          cx='100'
          cy='100'
          r='80'
          stroke='#ff0055'
          fill='none'
          variants={draw}
          custom={1}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='30'
          x2='360'
          y2='170'
          stroke='#00cc88'
          fill='none'
          variants={draw}
          custom={2}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='170'
          x2='360'
          y2='30'
          stroke='#00cc88'
          fill='none'
          variants={draw}
          custom={2.5}
          strokeWidth={2}
        />
        <motion.rect
          width='140'
          height='140'
          x='410'
          y='30'
          rx='20'
          stroke='#0099ff'
          fill='none'
          variants={draw}
          custom={3}
          strokeWidth={2}
        />

        <motion.circle
          cx='100'
          cy='300'
          r='80'
          stroke='#0099ff'
          fill='none'
          variants={draw}
          custom={2}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='230'
          x2='360'
          y2='370'
          stroke='#ff0055'
          fill='none'
          custom={3}
          variants={draw}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='370'
          x2='360'
          y2='230'
          stroke='#ff0055'
          fill='none'
          custom={3.5}
          variants={draw}
          strokeWidth={2}
        />
        <motion.rect
          width='140'
          height='140'
          x='410'
          y='230'
          rx='20'
          stroke='#00cc88'
          fill='none'
          custom={4}
          variants={draw}
          strokeWidth={2}
        />
        <motion.circle
          cx='100'
          cy='500'
          r='80'
          stroke='#00cc88'
          fill='none'
          variants={draw}
          custom={3}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='430'
          x2='360'
          y2='570'
          stroke='#0099ff'
          fill='none'
          variants={draw}
          custom={4}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='570'
          x2='360'
          y2='430'
          stroke='#0099ff'
          fill='none'
          variants={draw}
          custom={4.5}
          strokeWidth={2}
        />
        <motion.rect
          width='140'
          height='140'
          x='410'
          y='430'
          rx='20'
          stroke='#ff0055'
          fill='none'
          variants={draw}
          custom={5}
          strokeWidth={2}
        />
        <motion.circle
          cx='100'
          cy='700'
          r='80'
          stroke='#ff0055'
          fill='none'
          variants={draw}
          custom={4}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='630'
          x2='360'
          y2='770'
          stroke='#00cc88'
          fill='none'
          variants={draw}
          custom={5}
          strokeWidth={2}
        />
        <motion.line
          x1='220'
          y1='770'
          x2='360'
          y2='630'
          stroke='#00cc88'
          fill='none'
          variants={draw}
          custom={5.5}
          strokeWidth={2}
        />
        <motion.rect
          width='140'
          height='140'
          x='410'
          y='630'
          rx='20'
          stroke='#0099ff'
          fill='none'
          variants={draw}
          custom={6}
          strokeWidth={2}
        />
      </motion.svg>
    </div>
  );
};

export default AuthPageAnimation;
