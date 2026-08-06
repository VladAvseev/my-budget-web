import { Banner, type BannerProps } from './Banner';

export const VSuccessBanner = ({ visible, message, onClose }: BannerProps) => (
  <Banner type="success" visible={visible} message={message} onClose={onClose} />
);