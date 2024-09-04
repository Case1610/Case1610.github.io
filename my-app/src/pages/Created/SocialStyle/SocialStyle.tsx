import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from 'react';
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
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis, ReferenceLine, ReferenceArea, Label } from 'recharts';

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
            <Box component="section"
                sx={{
                    bgcolor: 'background.paper',
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 2, sm: 3, md: 5 },
                    pb: { xs: 10, sm: 10, md: 15 },
                    width: '100%',
                }}>
                <Typography variant="h5" color="primary" ><b>ソーシャルスタイル診断</b></Typography>
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
                    <Box
                    sx={{ mt:5, width: '100%', height:'100vh'}}>
                        <Grid2 container columns={12} spacing={1}>
                            <Grid2  size={{ xs: 12, sm: 4, md: 4 }}>
                                <Box component="img" src={result.gazo} alt={result.CommunicationType} sx={{ width: '100%' }} />
                                <Typography variant="h6" color={"primary"} sx={{ margin: 2, fontWeight: 'bold', textAlign: 'center' }}>{result.CommunicationType}</Typography>
                                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', }}>{result.explanation1}</Typography>
                                <Typography variant="body2" sx={{ mb: 5, width: '100%', }}>{result.explanation2}</Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                                <Box sx={{ width: ' 100%', height:{xs:'20vh', sm: '100%', md: '100%'} }}>
                                    <MatrixChart values={values} />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Box>
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

const MatrixChart = ({ values }: { values: { [key: string]: string } }) => {
    const { assertive, emotional } = calculateAssertiveAndEmotional(values);
    const data = [
        { x: assertive, y: emotional, r: 10 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{
                    top: 5,
                    right: 30,
                    bottom: 5,
                    left: 5,
                }}
            >
                <Legend verticalAlign="top" align="left" height={30} style={{ textAnchor: "middle" }} />
                <CartesianGrid />
                <ReferenceLine x={0} stroke="#888888" strokeWidth={5} />
                <ReferenceLine y={0} stroke="#888888" strokeWidth={5} />
                <ReferenceArea x1={-10} x2={10} y1={-10} y2={10} >
                    <Label value="感情を抑える" offset={15} position="top" fill="#aaa" style={{ fontWeight: 'bold', }} />
                    <Label value="意見を主張" offset={15} position="right" angle={90} fill="#aaa" style={{ fontWeight: 'bold', textAnchor: 'middle' }} />
                    <Label value="意見を聞く" offset={15} position="left" angle={90} fill="#aaa" style={{ fontWeight: 'bold', textAnchor: 'middle' }} />
                    <Label value="感情を出す" offset={15} position="bottom" fill="#aaa" style={{ fontWeight: 'bold', }} />
                </ReferenceArea>
                <ReferenceArea x1={0} x2={10} y1={10} y2={0} fill="#E59595">
                    <Label value='ドライバー' fill='#4F3131' style={{ fontWeight: 'bold', }} />
                </ReferenceArea>
                <ReferenceArea x1={0} x2={10} y1={0} y2={-10} fill="#E6D495" fillOpacity={0.3}>
                    <Label value='エクスプレッシブ' fill='#5D553A' style={{ fontWeight: 'bold', }} />
                </ReferenceArea>
                <ReferenceArea x1={-10} x2={0} y1={10} y2={0} fill="#95E6AC" fillOpacity={0.3}>
                    <Label value='エミアブル' fill='#3A5D44' style={{ fontWeight: 'bold', }} />
                </ReferenceArea>
                <ReferenceArea x1={-10} x2={0} y1={0} y2={-10} fill="#959CE6" fillOpacity={0.3}>
                    <Label value='アナリティカル' fill='#2D304B' style={{ fontWeight: 'bold', }} />
                </ReferenceArea>
                <XAxis type="number" dataKey="x" name="assertive" domain={[-10, 10]} fontSize={0} />
                <YAxis type="number" dataKey="y" name="emotional" domain={[-10, 10]} fontSize={0} />
                <ZAxis type="number" range={[300]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="あなた" data={data} fill='#ff6400' />
            </ScatterChart>
        </ResponsiveContainer>
    );
};


export default Body;

const root = createRoot(document.getElementById('root')!);

root.render(<Body />);
