FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and pom.xml first for better caching
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn/ .mvn/
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src/ src/

# Build the application
RUN ./mvnw clean package -DskipTests -B

EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/notesApp-0.0.1-SNAPSHOT.jar"]