import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faReply} from '@fortawesome/free-solid-svg-icons';

export type FontAwesomeIconPropsType = Omit<FontAwesomeIconProps, 'icon'>;

export function FaReply(props: FontAwesomeIconPropsType) {
  return <FontAwesomeIcon  icon={faReply} {...props} />;
}
