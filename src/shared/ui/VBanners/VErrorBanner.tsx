import { Banner, type BannerProps } from './Banner';

export const VErrorBanner = ({ visible, message, onClose }: BannerProps) => (
  <Banner type="error" visible={visible} message={message} onClose={onClose} />
);