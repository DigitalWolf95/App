import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type FontAwesomeIconPropsType = Omit<FontAwesomeIconProps, 'icon'>;

export function FaReply(props: FontAwesomeIconPropsType) {
  return <FontAwesomeIcon {...props} icon={'wifi'} />;
}
