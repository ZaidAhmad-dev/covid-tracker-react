import './InfoBox.css';
import { Card, CardContent, Typography } from "@mui/material";

const InfoBox = ({title, cases, active, isRed, total, ...props}) => {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}
        >
            <CardContent>
                {/* Title i.e Coronavirus cases */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>

                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
