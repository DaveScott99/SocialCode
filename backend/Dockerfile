FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
ADD ./target/socialcode-api-2.0-SNAPSHOT.jar socialcode-api.jar
ENTRYPOINT [ "java","-jar", "/socialcode-api.jar" ]