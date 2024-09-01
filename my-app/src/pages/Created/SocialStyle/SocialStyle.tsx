import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid2,
} from '@mui/material';
import { Chart, registerables,} from 'chart.js';

interface Question {
    id: string;
    Question: string;
    Answer1: string;
    Value1: string;
    Answer2: string;
    Value2: string;
}

const Body: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [values, setValues] = useState<{ [key: string]: string }>({});
    const [result, setResult] = useState<{ CommunicationType: string, explanation1: string, explanation2: string, gazo: string } | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        // CSVデータを外部ファイルから読み込む
        fetch('/data/SocialStyleQuestion.csv')
            .then(response => response.text())
            .then(data => {
                const parsedData = Papa.parse<Question>(data, {
                    header: true,
                    skipEmptyLines: true,
                });
                // console.log(parsedData);
                setQuestions(parsedData.data as Question[]);
            });
    }, []);

    return (
        <Container fixed>
            <Box component="section" sx={{ bgcolor: 'background.paper', pt: { xs: 2, sm: 3, md: 5 }, px: { xs: 2, sm: 8, md: 10 }, pb: { xs: 10, sm: 10, md: 15 }, width: '90vw' }}>
                <Typography variant="h5">ソーシャルスタイル診断</Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                    以下の質問に回答してください。回答後にあなたのソーシャルスタイルが表示されます。
                </Typography>
                {questions.map((question, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                        <FormControl component="fieldset" required>
                            <FormLabel component="legend">{question.Question}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby={`question-${index}`}
                                name={question.id}
                                value={values[question.id] || ''}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={question.Value1} control={<Radio />} label={question.Answer1} />
                                <FormControlLabel value={question.Value2} control={<Radio />} label={question.Answer2} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log(calculateAssertiveAndEmotional(values));
                        const result = determineCommunicationType(values);
                        setResult(result);
                    }}
                >
                    診断する
                </Button>
                {result && (
                    <Grid2 spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
                            <Box sx={{ mt: 5, width: { xs: "80vw", sm: "20vw", md: "20vw" } }}>
                                <Box component="img" src={result.gazo} alt={result.CommunicationType} sx={{ width: { xs: "100%", sm: "20vw", md: "20vw" } }} />
                                <Typography variant="h6" sx={{ margin: 2, fontWeight: 'bold', textAlign: 'center' }}>{result.CommunicationType}</Typography>
                                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', }}>{result.explanation1}</Typography>
                                <Typography variant="body2" sx={{ mb: 5, width: '100%', }}>{result.explanation2}</Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
                            <Box sx={{ width: { xs: "80vw", sm: "80vw", md: "80vw" } }}>
                                <MatrixChart values={values} />
                            </Box>
                        </Grid2>
                    </Grid2>
                )}
            </Box>
        </Container>
    );
};
const calculateAssertiveAndEmotional = (values: { [key: string]: string }) => {
    let aCount = 0;
    let bCount = 0;
    let cCount = 0;
    let dCount = 0;

    for (const key in values) {
        if (values[key] === 'A') {
            aCount++;
        } else if (values[key] === 'B') {
            bCount++;
        } else if (values[key] === 'C') {
            cCount++;
        } else if (values[key] === 'D') {
            dCount++;
        }
    }

    const assertive = aCount - bCount;
    const emotional = dCount - cCount;

    return {
        assertive,
        emotional,
    };
};
const determineCommunicationType = (values: { [key: string]: string }) => {
    const { assertive, emotional } = calculateAssertiveAndEmotional(values);

    let CommunicationType = '';
    let explanation1 = '';
    let explanation2 = '';
    let gazo = '';

    if (assertive >= 0) {
        if (emotional >= 0) {
            CommunicationType = "ドライバー";
            explanation1 = "意見を主張、感情を抑える";
            explanation2 = "合理的に仕事を進める目標達成型。感情表現は弱く、合理的に物事を達成していくスタイル。口数が少ない人が多い。行動が早く負けず嫌い。プロセスよりも結果を重視するので手段は問わない傾向あり。";
            gazo = "/image/socialStylePNG/01_Driver.png";
        } else {
            CommunicationType = "エクスプレッシブ";
            explanation1 = "意見を主張、感情を出す";
            explanation2 = "みんなから注目されることを好むスタイル。明るくて表情も豊か。友人が多い。ノリが良く、新しいことやトレンドに敏感で積極的に何かにチャレンジしている。";
            gazo = "/image/socialStylePNG/02_Expressive.png";
        }
    } else {
        if (emotional >= 0) {
            CommunicationType = "アナリティカル";
            explanation1 = "意見を聴く、感情を抑える";
            explanation2 = "観察を好む分析型。データを重視して、分析する。知識人の理論を良く知っている。感情は表情に表れず、話すよりも聞くことが多い。独特の見解がある人が多い。";
            gazo = "/image/socialStylePNG/03_Analytical.png";
        } else {
            CommunicationType = "エミアブル";
            explanation1 = "意見を聴く、感情を出す";
            explanation2 = "みんなの気持ちをくみ取れる調停役。話すよりも聞くスタイル。周囲の気持ちに敏感で、自分が注目されるよりも全体の調和を重視する。感情は表情に表れる。明るくて、いわば“いい人”。";
            gazo = "/image/socialStylePNG/04_Amiable.png";
        }
    }

    return { CommunicationType, explanation1, explanation2, gazo };
};
Chart.register(...registerables);
const MatrixChart = ({ values }: { values: { [key: string]: string } }) => {
    const result = calculateAssertiveAndEmotional(values);

    const data = {
        datasets: [
            {
                label: 'Assertive vs Emotional',
                data: [{ x: result.assertive, y: result.emotional }],
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear' as const,
                position: 'bottom' as const,
                title: {
                    display: true,
                    text: 'Assertive',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Emotional',
                },
            },
        },
        plugins: {
            beforeDraw: function (chart: Chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const midX = (chartArea.left + chartArea.right) / 2;
                const midY = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                // 第一象限
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(midX, chartArea.top, chartArea.right - midX, midY - chartArea.top);
                // 第二象限
                ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
                ctx.fillRect(chartArea.left, chartArea.top, midX - chartArea.left, midY - chartArea.top);
                // 第三象限
                ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                ctx.fillRect(chartArea.left, midY, midX - chartArea.left, chartArea.bottom - midY);
                // 第四象限
                ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
                ctx.fillRect(midX, midY, chartArea.right - midX, chartArea.bottom - midY);
                ctx.restore();
            }
        }as unknown as any,
    };

    return <Scatter data={data} options={options} />;
};
// let myLineChart: Chart;

// function initializeChart() {
//     const ctx = document.getElementById("myChart").getContext('2d');
//     myLineChart = new Chart(ctx, {
//         plugins: {
//             beforeDraw: function (chart) {
//                 const ctx = chart.ctx;
//                 const chartArea = chart.chartArea;
//                 const midX = (chartArea.left + chartArea.right) / 2;
//                 const midY = (chartArea.top + chartArea.bottom) / 2;
//                 ctx.save();
//                 // 第一象限
//                 ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
//                 ctx.fillRect(midX, chartArea.top, chartArea.right - midX, midY - chartArea.top);
//                 // 第二象限
//                 ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
//                 ctx.fillRect(chartArea.left, chartArea.top, midX - chartArea.left, midY - chartArea.top);
//                 // 第三象限
//                 ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
//                 ctx.fillRect(chartArea.left, midY, midX - chartArea.left, chartArea.bottom - midY);
//                 // 第四象限
//                 ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
//                 ctx.fillRect(midX, midY, chartArea.right - midX, chartArea.bottom - midY);
//                 ctx.restore();
//             }
//         },
//         type: 'scatter',
//         data: {
//             datasets: [{
//                 label: 'あなた',
//                 data: [{
//                     x: 0,
//                     y: 0,
//                 }],
//                 backgroundColor: 'RGBA(255,100,0, 1)',
//                 pointRadius: 15,
//             }]
//         },
//         options: {
//             title: {
//                 display: false,
//                 text: '診断結果'
//             },
//             legend: {
//                 display: false
//             },
//             scales: {
//                 x: {
//                     scaleLabel: {
//                         display: false,
//                         labelString: 'コミュニケーション'
//                     },
//                     position: 'top'
//                 },
//                 xAxes: [{
//                     type: 'linear',
//                     zeroLineTick: 0,
//                     ticks: {
//                         display: false,
//                         min: -10,
//                         max: 10,
//                         stepSize: 3,
//                     },
//                     gridLines: {
//                         drawTicks: false,
//                         zeroLineColor: '#aaaaaa',
//                         zeroLineWidth: 5
//                     }
//                 }],
//                 y: {
//                     scaleLabel: {
//                         display: false,
//                         labelString: '感情表現'
//                     },
//                     position: 'left',
//                     lineWidth: 2
//                 },
//                 yAxes: [{
//                     zeroLineTick: 0,
//                     ticks: {
//                         display: false,
//                         min: -10,
//                         max: 10,
//                         stepSize: 3
//                     },
//                     gridLines: {
//                         drawTicks: false,
//                         zeroLineColor: '#aaaaaa',
//                         zeroLineWidth: 5
//                     },
//                 }]
//             },
//         }
//     });
// }

export default Body;

const root = createRoot(document.getElementById('root')!);

root.render(<Body />);
