import React, { useState, useEffect } from 'react';
import {
    Stack,
    Container,
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Typography,
    Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import OutputTable from './Table';

const GroupingApp: React.FC = () => {
    const [groups, setGroups] = useState<Array<{ groupName: string, members: string[] }>>([]);

    const [members, setMembers] = useState('');
    const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => setMembers(e.target.value);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && members.trim() === '') {
            event.preventDefault();
        }
    };
    const memberCount = members.split('\n').filter((name) => name.trim() !== '').length;

    const [groupCount, setGroupCount] = useState<number>(1);
    const handleGroupCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value, 10);
        if (count >= 1) {
            setGroupCount(count);
        }
    };

    const [groupNames, setGroupNames] = useState('');
    const handleGroupNamesChange = (e: React.ChangeEvent<HTMLInputElement>) => setGroupNames(e.target.value);
    const [isGroupNamesChecked, setIsGroupNamesChecked] = useState(false);
    const handleGroupNamesCbC = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsGroupNamesChecked(e.target.checked);
    };

    const [groupSizes, setGroupSizes] = useState<number[]>(() => {
        const initialSize = Math.floor(memberCount / groupCount);
        const remainder = memberCount % groupCount;
        return Array(groupCount).fill(initialSize).map((size, index) => index < remainder ? size + 1 : size);
    });
    const [isGroupSizeChecked, setIsGroupSizeChecked] = useState(false);
    const handleGroupSizeCbC = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsGroupSizeChecked(e.target.checked);
    };
    const handleGroupSizesChange = (e: React.ChangeEvent<{ value: unknown }>, index: number) => {
        const value = e.target.value as number;
        const newGroupSizes = [...groupSizes];
        const oldValue = newGroupSizes[index];
        newGroupSizes[index] = value;

        const totalSize = newGroupSizes.reduce((acc, size) => acc + size, 0);
        const difference = memberCount - totalSize;

        if (difference !== 0) {
            // 他のグループのサイズを調整
            for (let i = 0; i < newGroupSizes.length; i++) {
                if (i !== index && newGroupSizes[i] + difference >= 1) {
                    newGroupSizes[i] += difference;
                    break;
                }
            }
        }
        // 合計が一致しない場合は元の値に戻す
        if (newGroupSizes.reduce((acc, size) => acc + size, 0) !== memberCount) {
            newGroupSizes[index] = oldValue;
        }
        console.log(newGroupSizes[0]);
        setGroupSizes(newGroupSizes);
    };

    const handleGroupMembers = () => {
        setGroups([]);
        let memberList: string[] = [];
        memberList = members.split('\n').filter((name) => name.trim() !== '');
        let nameList: string[] = [];
        if (groupNames !== "" && isGroupNamesChecked) {
            nameList = groupNames.split('\n').filter((name) => name.trim() !== '');
        }
        const shuffledMembers = memberList.sort(() => Math.random() - 0.5);
        let groupSize = Array(groupCount).fill(Math.ceil(shuffledMembers.length / groupCount));
        if (!isGroupSizeChecked) {
            groupSize = groupSizes
        }

        let startIndex = 0;
        const newGroups = Array.from({ length: groupCount }, (_, i) => {
            const endIndex = startIndex + groupSize[i];
            const group = {
                groupName: nameList[i] || `${i + 1}班`,
                members: shuffledMembers.slice(startIndex, endIndex),
            };
            startIndex = endIndex; // 次のグループの開始位置を更新
            return group;
        });
        setGroups(newGroups);
        setDataTable(<OutputTable groups={newGroups} />);
        };

    const handleNew = () => {
        setGroups([]);
        setMembers('');
        setGroupCount(2);
        setGroupNames('');
    };

    const handleClear = () => {
        setGroups([]);
    };
    const [dataTable, setDataTable] = useState<React.ReactNode | null>(null);
    useEffect(() => {
        const initialSize = Math.floor(memberCount / groupCount);
        const remainder = memberCount % groupCount;
        setGroupSizes(Array(groupCount).fill(initialSize).map((size, index) => index < remainder ? size + 1 : size));
    }, [memberCount, groupCount]);

    return (
        <Container fixed>
            <Box component="section"
                sx={{
                    bgcolor: 'background.paper',
                    pt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 2, sm: 8, md: 10 },
                    pb: { xs: 10, sm: 10, md: 15 },
                    width: '100%'
                }}>
                <Typography variant="h5" color="primary" ><b>GROUPER</b></Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                    人員と組数を設定してください。ランダムにグループ分けします。
                </Typography>
                <div className='input'>
                    <Button onClick={handleNew} variant="contained" size="medium">
                        <b>新規作成</b>
                    </Button>
                    <TextField
                        label="メンバー入力："
                        multiline
                        rows={4}
                        value={members}
                        onChange={handleMemberChange}
                        onKeyDown={handleKeyDown}
                        placeholder="1行に1名のメンバーを入力"
                        fullWidth
                        margin="normal"
                        error={members !== '' && memberCount < 2}
                        helperText={memberCount < 2 ? '※2つ以上の要素を記入してください' : ''}
                    />
                    <FormControl fullWidth disabled={members === '' || memberCount < 2}>
                        <InputLabel id="group-count-label">グループ数</InputLabel>
                        <Select
                            id="group-count-label"
                            value={groupCount}
                            label="グループ数"
                            onChange={(e) => handleGroupCountChange(e as React.ChangeEvent<HTMLInputElement>)}
                            fullWidth
                        >
                            {Array.from({ length: members.split('\n').length }, (_, i) => (
                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isGroupNamesChecked}
                                onChange={handleGroupNamesCbC}
                                name="showTextField"
                                color="primary"
                                disabled={members === '' || members.split('\n').length < 2}
                            />
                        }
                        label="グループ名の設定"
                    />
                    {isGroupNamesChecked && (
                        <TextField
                            label="グループ名（任意）："
                            multiline
                            rows={3}
                            value={groupNames}
                            onChange={handleGroupNamesChange}
                            placeholder="1行に1つのグループ名（任意）"
                            fullWidth
                        />
                    )}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isGroupSizeChecked&&memberCount >= 2}
                                onChange={handleGroupSizeCbC}
                                name="showTextField"
                                color="primary"
                                disabled={members === '' || memberCount < 2}
                            />
                        }
                        label="人数構成の設定"
                    />
                    {isGroupSizeChecked && (
                        <Stack direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}>
                            {groupSizes.map((_, i) => (
                                <Select
                                    key={i}
                                    id="group-count-label"
                                    value={groupSizes[i]||0}
                                    label={`グループ${i + 1}の人数：`}
                                    onChange={(e) => handleGroupSizesChange(e as React.ChangeEvent<{ value: unknown }>, i)}
                                >
                                    {Array.from({ length: memberCount }, (_, j) => (
                                        <MenuItem key={j} value={j + 1}>{j + 1}</MenuItem>
                                    ))}
                                </Select>
                            ))}
                        </Stack>
                    )}
                </div>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} mt={3} >
                    <Button onClick={handleGroupMembers} variant="contained" size="medium" disabled={memberCount < 2}>
                        <b>分ける</b>
                    </Button>
                    <Button onClick={handleClear} variant="outlined" startIcon={<DeleteIcon />} size="medium">
                        クリア
                    </Button>
                </Stack>
                {groups.length > 0 && (
                    <Box mt={3}>
                        {dataTable}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default GroupingApp;


