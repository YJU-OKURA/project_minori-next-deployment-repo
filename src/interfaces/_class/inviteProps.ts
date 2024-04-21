import ClassProps from './classProps';
interface InviteProps extends ClassProps {
  onInvitationClick: () => void;
  classes: ClassProps['classes'];
}

export default InviteProps;
