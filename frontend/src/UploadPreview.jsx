import { AspectRatio, Box, Button, Card, CardBody, Divider, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ScaleFade, Stack, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import PropTypes from 'prop-types';
import { CopyIcon, DownloadIcon } from '@chakra-ui/icons';

const VideoBox = ({video}) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const toast = useToast();
    let videoUrl = video?.video_url
    let videoTitle = videoUrl?.split("/").pop();

    const handleCopy = (type,url) => {
        navigator.clipboard.writeText(url)
        toast({
                title: `Copied ${type} Url`,
                isClosable: true,
                position: 'bottom',
                status: 'success',
            })
    }
    const handleDownload= async(url)=>{
    var element = document.createElement("a");
    var file = new Blob(
        [
            url
        ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = url.split('/').pop();
    element.click();
   }
    return (
        <VStack mt='3'>
            <Button
                onClick={onOpen} colorScheme='messenger'>Click to Preview Video</Button>
            <ScaleFade initialScale={0.9} in={video}>
                <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset='slideInBottom'
                >
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader
                        >
                            <Text>
                            {videoTitle}
                            </Text>
                        <ModalCloseButton my='8px' />
                        </ModalHeader>
                        
                        <Divider />
                        <ModalBody p='0'>
                            <Card>
                                <CardBody>
                                    <Box>   
                                    <AspectRatio maxW='560px' ratio={1}>
                                            <video controls>
                                                {
                                                    videoUrl &&
                                                    <source src={videoUrl} type="video/mp4" />   
                                                }
                                            Your browser does not support the video tag.
                                        </video>
                                        </AspectRatio>
                                        <Box py='2' display={'flex'} alignItems={'center'} gap='2' justifyContent={'end'}><Text color={ 'blackAlpha.900'}>Copy Video Url</Text><CopyIcon onClick={()=>handleCopy('video',videoUrl)} /></Box>  
                                    </Box>

                        <Divider mb='2' borderBottom={'0.5px solid gray'} />
                                    
                                    <Box mt='3' display={'flex'} justifyContent={'space-between'} gap='1'>
                                    {
                                            video?.thumbnail_urls.map((thumbnailUrl, i) => {
                                                
                                                let thumbnailTitle = thumbnailUrl.split('/').pop();
                                                return (
                                                    <Box key={i} borderWidth={'1px'} borderStyle={'solid'} borderColor={'gray.400'} borderRadius={'2%'} p='2' >
                                                        <Image src={thumbnailUrl} alt={thumbnailTitle} objectFit='cover' />
                                                        <Stack mt='2' display={'flex'}>
                                                            <Box>
                                                            
                                                                <Text
                                                                    fontSize={'xs'} >
                                                                    {thumbnailTitle}
                                                                </Text>
                                                            </Box>
                                                            <HStack>
                                                                <CopyIcon onClick={() => handleCopy('thumbnail', thumbnailUrl)} />
                                                                <DownloadIcon onClick={() => handleDownload(thumbnailUrl)} />
                                                            </HStack>
                                                        </Stack>
                                                    </Box>
                                                )

                                            })
                                    }
                                    </Box>
                                </CardBody>
                            </Card>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </ScaleFade>    
        </VStack>
    )
}

VideoBox.propTypes = {
  video: PropTypes.object
};

// VideoBox.propTypes = {
//   onOpen: PropTypes.func
// };

export default VideoBox