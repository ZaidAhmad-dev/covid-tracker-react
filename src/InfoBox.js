import { Card, CardContent, Typography } from "@mui/material";

const InfoBox = ({title, cases, total}) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title i.e Coronavirus cases */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox