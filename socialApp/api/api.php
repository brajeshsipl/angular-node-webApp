<?php

//database settings
$connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

function toGetAllUserData() {
    /* Get data */
    $connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
    $result = mysqli_query($connect, "select * from user ORDER BY user_id DESC");
    $data = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            unset($row['password']);
            $data[] = $row;
        }
        $response = array('success' => true, 'message' => mysqli_num_rows($result) . ' records found', 'data' => $data);
        return $response;
    } else {
        $response = array('success' => false, 'message' => mysqli_num_rows($result) . ' no records found', 'data' => $data);
        return $response;
    }
    return array();
}

function toGetAllUserPostData() {
    /* Get data */
    $connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
    $result = mysqli_query($connect, "select * from posts inner join user where user.user_id = posts.post_user_id ORDER BY posts.post_datetime DESC");
    $data = array();
    $rows = mysqli_num_rows($result);
    if ($rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            unset($row['password']);
            $data['post'][] = $row;
        }
        for ($i = 0; $i < $rows; $i++) {

            $data['post'][$i]['comment'] = toGetUserCommentData($data['post'][$i]['post_id']);
            $data['post'][$i]['comment_text'] = '';
        }
        $response = array('success' => true, 'message' => mysqli_num_rows($result) . ' records found', 'data' => $data);
        return $response;
    } else {
        $response = array('success' => false, 'message' => mysqli_num_rows($result) . ' no records found', 'data' => $data);
        return $response;
    }
    return array();
}

function toGetUserCommentData($postid) {
    /* Get data */
    $connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
    $result = mysqli_query($connect, "select * from comments inner join user on comments.comment_user_id = user.user_id where comment_post_id = '$postid'");
    $data = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            unset($row['password']);
            $data[] = $row;
        }
        return $data;
    } else {
        return $data;
    }
    return $data;
}

function toCheckRecordExist($username) {
    /* Get data */
    $connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
    $result = mysqli_query($connect, "select username from user where username = '$username'");
    if (mysqli_num_rows($result) > 0) {
        return mysqli_num_rows($result);
    } else {
        return 0;
    }
}

function toLogin($username, $password) {
    /* Get data */
    $connect = mysqli_connect("localhost", "root", "sipl@1234", "socialApp");
    $result = mysqli_query($connect, "select * from user where username = '$username' and password = '$password'");
    $data = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        $response = array('success' => true, 'message' => 'Login successfully ', 'data' => $data);
        return $response;
    } else {
        return 0;
    }
}

$method = $_GET['method'];
if (!empty($method)) {
    switch ($method) {
        case 'register':
            $postData = json_decode(file_get_contents("php://input"));
          
            $firstName = $postData->first_name;
            $lastName = $postData->last_name;
            $username = $postData->username;
            $password = $postData->password;
            $image = $postData->image;
            if (!empty($firstName) && !empty($lastName) && !empty($username) && !empty($password)) {
                    /* insert data */
                    $responseData = toCheckRecordExist($username);
                    if ($responseData == 0) {
                        $result = mysqli_query($connect, "INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `username`, `password`, `image`) VALUES (NULL, '$firstName', '$lastName', '$username', '$password', '$image');");
                        $response = array('success' => true, 'message' => 'Data inserted successfully.');
                    } else {
                        $response = array('success' => false, 'message' => 'Username already exist.');
                    }
                
                $data = $response;
                print json_encode($data);
            } else {
                $response = array('success' => false, 'message' => 'Please fill required fields.');
                $data = $response;
                print json_encode($data);
            }
            break;

        case 'login':
            $postData = json_decode(file_get_contents("php://input"));
            $username = $postData->username;
            $password = $postData->password;
            $responseData = toLogin($username, $password);
            if ($responseData == 0) {
                $response = array('success' => false, 'message' => 'Username password does not match.');
                print json_encode($response);
            } else {
                $response = $responseData;
                print json_encode($response);
            }
            break;

        case 'postinsert':
            $postData = json_decode(file_get_contents("php://input"));
            $postId = $postData->post_id;
            $postUserId = $postData->post_user_id;
            $postText = $postData->post_text;
            if (!empty($postUserId) && !empty($postText)) {
                if (!empty($postId)) {
                    /* Update */
                    $result = mysqli_query($connect, "UPDATE `posts` SET `post_user_id` = '$postUserId', `post_text` = '$postText' WHERE `post_id` = $postId;");
                    $response = array('success' => true, 'message' => 'Post updated successfully.');
                } else {
                    /* insert data */
                    $result = mysqli_query($connect, "INSERT INTO `posts` (`post_id`, `post_user_id`, `post_text`) VALUES (NULL, '$postUserId', '$postText');");
                    $response = array('success' => true, 'message' => 'Post inserted successfully.');
                }
                $data = $response;
                print json_encode($data);
            } else {
                $response = array('success' => false, 'message' => 'Please fill required fields.');
                $data = $response;
                print json_encode($data);
            }
            break;
        case 'postlist':
            $data = toGetAllUserPostData();
            print json_encode($data);
            break;

        case 'deleteuser':
            $postData = json_decode(file_get_contents("php://input"));
            $userId = $postData->user_id;
            if (!empty($userId)) {
                $result = mysqli_query($connect, "DELETE FROM `user` WHERE `user_id` = $userId");
                $response = array('success' => true, 'message' => 'User deleted successfully.');
            } else {
                $response = array('success' => false, 'message' => 'User id not found.');
            }

            print json_encode($response);
            break;

        case 'updatepost':
            $postData = json_decode(file_get_contents("php://input"));
            $postId = $postData->post_id;
            $postUserId = $postData->post_user_id;
            $postText = $postData->post_text;
            if (!empty($postId) && !empty($postUserId) && !empty($postText)) {
                $result = mysqli_query($connect, "UPDATE `posts` SET `post_text` = $postText WHERE `post_user_id` = $postUserId AND `post_id` = $postId");
                $response = array('success' => true, 'message' => 'Post updated successfully.');
            } else {
                $response = array('success' => false, 'message' => 'Post not found.');
            }

            print json_encode($response);
            break;

        case 'updatecomment':
            $postData = json_decode(file_get_contents("php://input"));
            $comment_id = $postData->comment_id;
            $commentUserId = $postData->comment_user_id;
            $commentText = $postData->comment_text;
            if (!empty($postId) && !empty($postUserId) && !empty($postText)) {
                $result = mysqli_query($connect, "UPDATE `comments` SET `comment_text` = $commentText WHERE `comment_user_id` = $commentUserId AND `comment_id` = $comment_id");
                $response = array('success' => true, 'message' => 'Comment updated successfully.');
            } else {
                $response = array('success' => false, 'message' => 'Comment not found.');
            }

            print json_encode($response);
            break;

        case 'sendmessage':
            $postData = json_decode(file_get_contents("php://input"));
            $messageSenderId = $postData->message_sender_id;
            $messageReceiverId = $postData->message_receiver_id;
            $messageText = $postData->message_text;
            if (!empty($messageSenderId) && !empty($messageReceiverId) && !empty($messageText)) {
                $result = mysqli_query($connect, "INSERT INTO `message` (`message_sender_id`, `message_receiver_id`, `message_text`) VALUES ('$messageSenderId', '$messageReceiverId', '$messageText');");
                $response = array('success' => true, 'message' => 'Message sent successfully.');
            } else {
                $response = array('success' => false, 'message' => 'Message not found.');
            }

            print json_encode($response);
            break;
        case 'getmessage':
            $postData = json_decode(file_get_contents("php://input"));
            $messageSenderId = $postData->message_sender_id;
            $messageReceiverId = $postData->message_receiver_id;
            $data = array();
            if (!empty($messageSenderId) && !empty($messageReceiverId) ) {
               // echo "SELECT U.*,M.* FROM user U,message M WHERE CASE WHEN M.message_sender_id = '$messageSenderId' AND M.message_receiver_id = '$messageReceiverId' THEN M.message_receiver_id = U.user_id WHEN M.message_sender_id = '$messageReceiverId' AND M.message_receiver_id = '$messageSenderId' THEN M.message_sender_id = U.user_id END ORDER BY M.`message_datetime` DESC";
                $result = mysqli_query($connect, "SELECT U.*,M.* FROM user U,message M WHERE CASE WHEN M.message_sender_id = '$messageSenderId' AND M.message_receiver_id = '$messageReceiverId' THEN M.message_receiver_id = U.user_id WHEN M.message_sender_id = '$messageReceiverId' AND M.message_receiver_id = '$messageSenderId' THEN M.message_sender_id = U.user_id END ORDER BY M.`message_datetime` ASC");
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $data[] = $row;
                    }
                   
                    $response = array('success' => true, 'message' => 'Message found ', 'data' => $data);
                    
                } else {
                    $response = array('success' => false, 'message' => 'Message not found.', 'data' => $data);
                }
            } else {
                $response = array('success' => false, 'message' => 'Message not found.', 'data' => $data);
            }

            print json_encode($response);
            break;
            
       case 'getpostbyuser':
            $postData = json_decode(file_get_contents("php://input"));
            $postUserId = $postData->post_user_id;
            $data = array();
            if (!empty($postUserId)) {
                $result = mysqli_query($connect, "SELECT * from posts WHERE post_user_id = '$postUserId' ORDER BY M.`message_datetime` ASC");
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $data[] = $row;
                    }
                    $response = array('success' => true, 'message' => 'Message found ', 'data' => $data);
                    
                } else {
                    $response = array('success' => false, 'message' => 'Message not found.', 'data' => $data);
                }
            } else {
                $response = array('success' => false, 'message' => 'Message not found.', 'data' => $data);
            }

            print json_encode($response);
            break;

        case 'insertcomment':
            $postData = json_decode(file_get_contents("php://input"));
            $commentPostId = $postData->comment_post_id;
            $commentText = $postData->comment_text;
            $commentUserId = $postData->comment_user_id;
            if (!empty($commentPostId) && !empty($commentText) && !empty($commentUserId)) {
                $result = mysqli_query($connect, "INSERT INTO `comments` (`comment_id`, `comment_user_id`,`comment_post_id`, `comment_text`) VALUES (NULL, '$commentUserId','$commentPostId', '$commentText');");
                $response = array('success' => true, 'message' => 'Comment insert successfully.');
            } else {
                $response = array('success' => false, 'message' => 'Something wrong.');
            }

            print json_encode($response);
            break;

        case 'deletecomment':
            $postData = json_decode(file_get_contents("php://input"));
            $commentId = $postData->comment_id;
            $commentUserId = $postData->comment_user_id;
            if (!empty($commentId) && !empty($commentUserId)) {
                $result = mysqli_query($connect, "DELETE FROM `comments` WHERE `comment_user_id` = $commentUserId AND `comment_id` = $commentId");
                $response = array('success' => true, 'message' => 'Comment deleted successfully.');
            } else {
                $response = array('success' => false, 'message' => 'Comment not found.');
            }

            print json_encode($response);
            break;

        case 'listuser':
            $data = toGetAllUserData();
            print json_encode($data);
            break;

        case 'commentlist':
            $data = toGetUserCommentData();
            print json_encode($data);
            break;

        default:
            print json_encode(array('success' => false));
            break;
    }
} else {
    print json_encode(array('success' => false));
}
?>






