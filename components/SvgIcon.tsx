export default function SvgIcon({ width, height, path, color = "white", fit }: SvgIconProps) {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        WebkitMask: `url(${path}) no-repeat center`,
        mask: `url(${path}) no-repeat center`,
        WebkitMaskSize: fit ? "contain" : "auto",
        maskSize: fit ? "contain" : "auto",
      }}
    />
  );
}
