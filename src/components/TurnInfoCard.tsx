interface ResultDto {
  ball: number;
  strike: number;
}

interface TurnInfoCardProps {
  index: number;
  value: string;
  result: ResultDto;
}

const TurnInfoCard = ({ index, value, result }: TurnInfoCardProps) => {};

export default TurnInfoCard;
