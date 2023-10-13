import {
  useToast,
  Box,
  VStack,
  Button,
  Input,
  Icon,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FcVideoFile } from "react-icons/fc";
import { CgAttachment } from "react-icons/cg";
import axios from "axios";
import UploadPreview from "./UploadPreview";

var API_URL = `http://localhost:5000/api/v1`;

const FileDropzone = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [fileUrls, setFileUrls] = useState({});
    const toast = useToast();
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "video/mp4": [] },    // Allow only mp4 file to be uploaded
        maxFiles: 1,                    // Allow only one file to be uploaded
        onDrop: (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length == 1) {
            setFile(acceptedFiles[0]);
            setFileUrls({})
        } else {
            toast({
            title: "Please select only one file.",
            isClosable: true,
            position: "bottom",
            status: "error",
            });
        }
        },
    });

    const handleUpload = async () => {
        if (!file) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("video", file);
            //  for (var key of formData.entries()) {
            //         console.log(key[0] + ', ' + key[1]);
            //     }
            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            };
            const response = await axios.post(
                `${API_URL}/files/upload`,
                formData,
                config
            );
            if (response.statusText === "OK") {
                toast({
                    title: `Video upload successful`,
                    isClosable: true,
                    position: "bottom",
                    status: "success",
                });
                setLoading(false);
                setFile(null);
                setFileUrls({})
                //if uploaded file could have spaces in title, so decode %20 to ' '
                response.data.videoUrl = decodeURIComponent(response.data.videoUrl)
                if (response.data.videoUrl) {
                    await fetchFileInfoFromDB(response.data.videoUrl);
                }
            }
        }
        catch (error) {
            setLoading(false);
            toast({
                title: `Video upload failed`,
                // description:`error.data`,
                isClosable: true,
                position: "bottom",
                status: "error",
            });
            // console.error("Error uploading video:", error);
        }
    };
    const handleReset = () => {
        setFile(null);
        setFileUrls({})
    };

    const fetchFileInfoFromDB = async (fileUrl) => {
        setLoadingInfo(true)
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post(
                `${API_URL}/files/fetch-file`,
                {
                fileUrl,
                },
                config
            );
            // console.log("Fetched File info:", response.data);
            setFileUrls(response.data);
            setLoadingInfo(false)
        }
        catch (error) {
            setLoadingInfo(false)
            toast({
                title: `Error fetching file info from database`,
                // description:`error.data`,
                isClosable: true,
                position: "bottom",
                status: "error",
            });
            
            // console.error("Error fetching file info from database", error);
        }
    };
    return (
        <VStack mt="10%">
        <Box
            border={"1.6px dashed black"}
            p="5%"
            cursor={"pointer"}
            {...getRootProps({ className: "dropzone" })}
        >
            <Input {...getInputProps()} />
            <VStack spacing={"5"}>
            <Box>
                <Icon as={FcVideoFile} boxSize={"30px"} />
                <Text color={"GrayText"}>
                Drag & drop a video/mp4 file here here
                </Text>
            </Box>

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                position={"relative"}
            >
                <Text pos={"absolute"} bottom={"25%"} right={"150%"}>
                _________________
                </Text>
                OR
                <Text pos={"absolute"} bottom={"25%"} left={"150%"}>
                _________________
                </Text>
            </Box>

            <Box>
                <Icon as={CgAttachment} boxSize={"25px"} color={"blue.500"} />
                <Text color={"GrayText"}>
                click to select a video/mp4 file here
                </Text>
            </Box>
            </VStack>
        </Box>
        {file && (
            <VStack spacing={"2"} mt="3">
            <Box>
                <Text fontWeight={"bold"}>Selected File</Text>
                <Text color={"GrayText"}>{file.name}</Text>
            </Box>
            <Box>
                <Button
                    mt="3"
                    px="2"
                    me="2"
                    colorScheme="linkedin"
                    isLoading={loading}
                    onClick={handleUpload}
                >
                Upload
                </Button>
                
                <Button
                    mt="3"
                    colorScheme={loading ? "blackAlpha":"orange"}
                    onClick={()=>loading ? '': handleReset()}
                >
                Reset
                </Button>
                
            </Box>
            </VStack>
            )
        }
        {
            loadingInfo &&
            <Box mt='3'>
                <Text fontWeight={"bold"}>Fetching video information from database</Text>    
                <CircularProgress isIndeterminate color='#0078FF' /> 
            </Box>
        }                
        {
            fileUrls.file &&
            <UploadPreview video={fileUrls.file} />
        }    
        </VStack>
    );
};

export default FileDropzone;
