FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy everything
COPY . .

# Make mvnw executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/notesApp-0.0.1-SNAPSHOT.jar"]