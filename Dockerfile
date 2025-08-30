FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE $PORT

CMD ["java", "-jar", "target/notesApp-0.0.1-SNAPSHOT.jar"]